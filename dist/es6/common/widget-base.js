import {fireKendoEvent, getEventsFromAttributes, _hyphenate, pruneOptions, useTemplates} from './util';
import {OptionsBuilder} from './options-builder';
import {TemplateCompiler} from './template-compiler';
import {inject, transient} from 'aurelia-dependency-injection';
import {TaskQueue} from 'aurelia-task-queue';

/**
* Abstraction of commonly used code across wrappers
*/
@transient()
@inject(TaskQueue, TemplateCompiler, OptionsBuilder)
export class WidgetBase {

  /**
  * The element of the custom element, or the element on which a custom attribute
  * is placed. DOM events will be raised on this element
  */
  element: Element;

  /**
  * Used to prevent race conditions when events are raised before
  * all bindings have been updated.
  */
  taskQueue: TaskQueue;

  /**
  * The element on which a Kendo widget is initialized
  * This is the "element" by default
  */
  target: Element;

  /**
  * The Kendo control's name, such as kendoGrid or kendoButton
  */
  controlName: string;

  /**
  * The parent context (used for template compilation)
  */
  $parent: any;

  /**
  * The widgets parent viewmodel (this is the object instance the user will bind to)
  */
  viewModel: any;

  /**
  * The constructor of a Kendo control
  */
  ctor: any;

  constructor(taskQueue, templateCompiler, optionsBuilder) {
    this.taskQueue = taskQueue;
    this.optionsBuilder = optionsBuilder;
    templateCompiler.initialize();
  }

  control(controlName) {
    if (!controlName || !jQuery.fn[controlName]) {
      throw new Error(`The name of control ${controlName} is invalid or not set`);
    }

    this.controlName = controlName;

    let ctor = jQuery.fn[this.controlName];
    this.kendoOptions = ctor.widget.prototype.options;
    this.kendoEvents = ctor.widget.prototype.events;

    return this;
  }

  linkViewModel(viewModel) {
    if (!viewModel) {
      throw new Error('viewModel is not set');
    }

    this.viewModel = viewModel;

    return this;
  }

  useViewResources(resources) {
    if (!resources) {
      throw new Error('resources is not set');
    }

    this.viewResources = resources;

    return this;
  }

  useValueBinding() {
    this.withValueBinding = true;

    return this;
  }

  /**
  * collects all options objects
  * calls all hooks
  * then initialized the Kendo control as "widget"
  */
  createWidget(options) {
    if (!options) {
      throw new Error('the createWidget() function needs to be called with an object');
    }

    if (!options.element) {
      throw new Error('element is not set');
    }

    if (!options.parentCtx) {
      throw new Error('parentCtx is not set');
    }

    // generate all options, including event handlers - use the rootElement if specified, otherwise fall back to the element
    // this allows a child element in a custom elements tempate to be the container for the kendo control
    // but allows the plugin to correctly discover attributes on the root element to match against events
    let allOptions = this._getOptions(options.rootElement || options.element);

    // before initialization callback
    // allows you to modify/add/remove options before the control gets initialized
    if (options.beforeInitialize) {
      options.beforeInitialize(allOptions);
    }

    // add parent context to options
    // deepExtend in kendo.core will fail with stack
    // overflow if we don't put it in an array :-\
    Object.assign(allOptions, {
      _$parent: [options.parentCtx],
      _$resources: [this.viewResources]
    });

    // instantiate the Kendo control
    let widget = this._createWidget(options.element, allOptions, this.controlName);

    widget._$parent = options.parentCtx;
    widget._$resources = this.viewResources;

    if (this.withValueBinding) {
      widget.first('change', (args) => this._handleChange(args.sender));

      // sync kValue after initialization of the widget
      // some widgets (such as dropdownlist) select first item
      this._handleChange(widget);
    }

    if (options.afterInitialize) {
      options.afterInitialize();
    }

    return widget;
  }


  _createWidget(element, options, controlName) {
    return jQuery(element)[controlName](options).data(controlName);
  }


  /**
  * combines all options objects and properties into a single options object
  */
  _getOptions(element) {
    let options = this.optionsBuilder.getOptions(this.viewModel, this.controlName);
    let eventOptions = this.getEventOptions(element);

    // merge all option objects together
    // - options on the wrapper
    // - options compiled from all the bindable properties
    // - event handler options
    return pruneOptions(Object.assign({}, this.viewModel.options, options, eventOptions));
  }


  /**
  * convert attributes into a list of events a user wants to subscribe to.
  * These events are then subscribed to, which when called
  * calls the fireKendoEvent function to raise a DOM event
  */
  getEventOptions(element) {
    let options = {};
    let allowedEvents = this.kendoEvents;
    let delayedExecution = ['change'];

    // iterate all attributes on the custom elements
    // and only return the normalized kendo event's (dataBound etc)
    let events = getEventsFromAttributes(element);

    events.forEach(event => {
      // throw error if this event is not defined on the Kendo control
      if (!allowedEvents.includes(event)) {
        throw new Error(`${event} is not an event on the ${this.controlName} control`);
      }

      if (delayedExecution.includes(event)) {
        options[event] = e => {
          this.taskQueue.queueMicroTask(() => fireKendoEvent(element, _hyphenate(event), e));
        };
      } else {
        options[event] = e => fireKendoEvent(element, _hyphenate(event), e);
      }
    });

    return options;
  }


  _handleChange(widget) {
    this.viewModel.kValue = widget.value();
  }

  handlePropertyChanged(widget, property, newValue, oldValue) {
    if (property === 'kValue' && this.withValueBinding) {
      widget.value(newValue);
    }
  }

  useTemplates(target, controlName, templates) {
    return useTemplates(target, controlName, templates);
  }

  /**
  * destroys the widget
  */
  destroy(widget) {
    widget.destroy();
  }
}

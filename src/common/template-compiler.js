import {inject} from 'aurelia-framework';
import {TemplatingEngine} from 'aurelia-templating';

/**
* An adaptor which uses Aurelia's enhance capability to
* compile any template Kendo wants to have compiled
*/
@inject(TemplatingEngine)
export class TemplateCompiler {

  /**
  * We don't need to initialize the TemplateCompiler every time a Kendo controls
  * is initialized
  */
  isInitialized = false;

  constructor(templatingEngine) {
    this.templatingEngine = templatingEngine;
  }

  /**
  * Initialize the template compiler and
  * patch the angular property to retrieve compilation requests
  * from Kendo controls
  * @param $parent The overrideContext to use when a template gets compiled
  */
  initialize() {
    if (this.isInitialized) return;

    // all controls derive from kendo.ui.Widget
    // override the angular property on these objects, and point it towards handleTemplateEvents
    let _this = this;
    kendo.ui.Widget.prototype.angular = function(_event, _args) {
      _this.handleTemplateEvents(this, _event, _args);
    };
    kendo.mobile.ui.Widget.prototype.angular = function(_event, _args) {
      _this.handleTemplateEvents(this, _event, _args);
    };

    this.isInitialized = true;
  }

  /**
  * Gets called by Kendo, and filters out compile and cleanup events,
  * then calls the compile or cleanup function with the needed arguments
  * @param _event Events like 'compile' or 'cleanup'
  * @param _args optional array of dataitems
  */
  handleTemplateEvents(widget, _event: string, _args?) {
    if (_event !== 'compile' && _event !== 'cleanup') return;

    let $parent = widget._$parent;

    if (!$parent) return;

    let args = _args();
    let elements = args.elements; // extract elements from the args
    let data = args.data; // extract the dataitems from the args

    switch (_event) {
    case 'compile':
      // we need to pass elements and data to compile
      // so that Aurelia can enhance this elements with the correct
      // binding context
      this.compile($parent, elements, data);
      break;

    case 'cleanup':
      // we don't care about dataitems when we do the cleanup
      // so we just pass in the DOM elements
      this.cleanup(elements);
      break;

    default:
      break;
    }
  }

  /**
  * loops through each element, and find the matching dataitem
  * and calls enhanceView(element, dataItem) for each element there is
  * @param elements an array of Elements or a jQuery selector
  * @param data optionally an array of dataitems
  */
  compile($parent, elements, data) {
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let ctx;

      if (data && data[i]) {
        let _data = data[i];
        ctx = _data.dataItem;
      }

      if (element instanceof jQuery) {
        element.each((index, elem) => this.enhanceView($parent, elem, ctx));
      } else {
        this.enhanceView($parent, element, ctx);
      }
    }
  }

  /**
  * uses the enhance function of Aurelia's TemplatingEngine
  * to "compile" existing DOM elements
  * @param element The Element to compile
  * @param ctx The dataitem (context) to compile the Element with
  */
  enhanceView($parent, element, ctx) {
    let view = this.templatingEngine.enhance(element);

    view.bind(ctx, $parent); // call the bind() function on the view with the dataItem we got from Kendo
    view.attached(); // attach it to the DOM

    // when we do cleanup, we need to get the view instance
    // so we can call detached/unbind
    // so we store this view instance in the DOM element using JQuery.data
    $(element).data('viewInstance', view);
  }

  /**
  * loops through each element kendo asks us to clean up
  * calls cleanupView() for each element
  * @param element An array of elements
  */
  cleanup(elements) {
    if (!elements) return;

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      this.cleanupView(element);
    }
  }

  /**
  * cleans up the view kendo has asked us to clean up
  */
  cleanupView(element) {
    // extract Aurelia's View instance from the element
    // we stored this in the enhanceView function
    let view = $(element).data('viewInstance');
    if (!view) return;

    // unbind and detach the view
    view.detached();
    view.unbind();
  }
}

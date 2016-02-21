import * as LogManager from 'aurelia-logging';
import 'jquery';
import 'kendo.autocomplete.min';
import 'kendo.virtuallist.min';
import 'kendo.button.min';
import 'kendo.dataviz.chart.min';
import 'kendo.grid.min';
import {Aurelia} from 'aurelia-framework';
import {inject,Container,transient} from 'aurelia-dependency-injection';
import {customAttribute,bindable,customElement,BindableProperty,HtmlBehaviorResource,noView,processContent,TargetInstruction,TemplatingEngine,children,ViewResources} from 'aurelia-templating';
import {metadata} from 'aurelia-metadata';
import {bindingMode} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';

/**
* Configure the Aurelia-KendoUI-plugin
*/
export class KendoConfigBuilder {

	resources: string[] = [];
  useGlobalResources: boolean = true;

  /**
  * Globally register all Kendo Core wrappers
  */
  core(): KendoConfigBuilder {
    this.kendoAutoComplete()
      .kendoButton()
      .kendoTemplateSupport();
    return this;
  }

  /**
  * Globally register all Kendo Core and Kendo Pro wrappers
  */
  pro(): KendoConfigBuilder {
    this.core()
      .kendoGrid()
      .kendoChart();
    return this;
  }

  /**
  * Don't globalize any resources
  * Allows you to import wrappers yourself via <require></require>
  */
  withoutGlobalResources(): KendoConfigBuilder {
    this.useGlobalResources = false;
    return this;
  }

    /**
  * Registers value converters (wrappers around kendo functions)
  */
  useValueConverters(): KendoConfigBuilder {
    this.resources.push('valueconverters/valueconverters');
    return this;
  }

  /**
  * Adds kendo templating support
  */
  kendoTemplateSupport(): KendoConfigBuilder {
    this.resources.push('common/k-template');
    return this;
  }

  kendoAutoComplete(): KendoConfigBuilder {
    this.resources.push('autocomplete/autocomplete');
    return this;
  }

  kendoButton(): KendoConfigBuilder {
    this.resources.push('button/button');
    return this;
  }

  kendoGrid(): KendoConfigBuilder {
    this.resources.push('grid/grid');
    this.resources.push('grid/k-col');
    return this;
  }

  kendoChart(): KendoConfigBuilder {
    this.resources.push('chart/chart');
    return this;
  }
}

let logger = LogManager.getLogger('aurelia-kendoui-plugin');
export function configure(aurelia: Aurelia, configCallback?: (builder: KendoConfigBuilder) => void) {
  let builder = new KendoConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

    // Provide core if nothing was specified
  if (builder.resources.length === 0) {
    logger.warn('Nothing specified for kendo configuration - using defaults for Kendo Core');
    builder.core();
  }

    // Pull the data off the builder
  let resources = builder.resources;

  if (builder.useGlobalResources) {
    aurelia.globalResources(resources);
  }
}

@customAttribute(`${constants.attributePrefix}autocomplete`)
@generateBindables('kendoAutoComplete')
@inject(Element, WidgetBase)
export class AutoComplete {

  @bindable options = {};

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoAutoComplete')
                        .linkViewModel(this)
                        .useValueBinding();
  }

  bind(ctx) {
    this.$parent = ctx;

    this.recreate();
  }

  recreate() {
    this.kWidget = this.widgetBase.createWidget({
      element: this.element,
      parentCtx: this.$parent
    });
  }

  propertyChanged(property, newValue, oldValue) {
    this.widgetBase.handlePropertyChanged(this.kWidget, property, newValue, oldValue);
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

@customAttribute(`${constants.attributePrefix}button`)
@generateBindables('kendoButton')
@inject(Element, WidgetBase)
export class Button {

  @bindable options = {};

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoButton')
                        .linkViewModel(this);
  }

  bind(ctx) {
    this.$parent = ctx;

    this.recreate();
  }

  recreate() {
    this.kWidget = this.widgetBase.createWidget({
      element: this.element,
      parentCtx: this.$parent
    });
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

@customElement(`${constants.elementPrefix}chart`)
@generateBindables('kendoChart')
@inject(Element, WidgetBase)
export class Chart {

  @bindable options = {};

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoChart')
                        .linkViewModel(this);
  }

  bind(ctx) {
    this.$parent = ctx;
  }

  attached() {
    this.recreate();
  }

  recreate() {
    this.kWidget = this.widgetBase.createWidget({
      element: this.element,
      parentCtx: this.$parent
    });
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

export let bindables = {"kendoAutoComplete":["animation","dataSource","dataTextField","delay","enable","filter","fixedGroupTemplate","groupTemplate","headerTemplate","height","highlightFirst","ignoreCase","minLength","name","placeholder","popup","separator","suggest","template","valuePrimitive","virtual"],"kendoBarcode":["background","border","checksum","color","height","name","padding","renderAs","text","type","value","width"],"kendoButton":["enable","icon","imageUrl","name","spriteCssClass"],"kendoCalendar":["culture","dates","depth","disableDates","footer","format","max","min","month","name","start","value"],"kendoChart":["autoBind","axisDefaults","categoryAxis","chartArea","dataSource","legend","name","panes","pannable","pdf","plotArea","renderAs","series","seriesColors","seriesDefaults","theme","title","tooltip","transitions","valueAxis","xAxis","yAxis","zoomable"],"kendoColorPalette":["columns","name","palette","tileSize","value"],"kendoColorPicker":["buttons","columns","messages","name","opacity","palette","preview","tileSize","toolIcon","value"],"kendoComboBox":["animation","autoBind","cascadeFrom","cascadeFromField","dataSource","dataTextField","dataValueField","delay","enable","filter","fixedGroupTemplate","groupTemplate","headerTemplate","height","highlightFirst","ignoreCase","index","minLength","name","placeholder","popup","suggest","template","text","value","valuePrimitive","virtual"],"kendoContextMenu":["alignToAnchor","animation","closeOnClick","dataSource","direction","filter","hoverDelay","name","orientation","popupCollision","showOn","target"],"kendoDatePicker":["ARIATemplate","animation","culture","dates","depth","disableDates","footer","format","max","min","month","name","parseFormats","start","value"],"kendoDateTimePicker":["ARIATemplate","animation","culture","dates","depth","disableDates","footer","format","interval","max","min","month","name","parseFormats","start","timeFormat","value"],"kendoDiagram":["autoBind","connectionDefaults","connections","connectionsDataSource","dataSource","editable","layout","name","pannable","pdf","selectable","shapeDefaults","shapes","template","zoom","zoomMax","zoomMin","zoomRate"],"kendoDraggable":["axis","container","cursorOffset","distance","filter","group","hint","ignore"],"kendoDropDownList":["animation","autoBind","cascadeFrom","cascadeFromField","dataSource","dataTextField","dataValueField","delay","enable","filter","fixedGroupTemplate","groupTemplate","headerTemplate","height","ignoreCase","index","minLength","name","optionLabel","optionLabelTemplate","popup","template","text","value","valuePrimitive","valueTemplate","virtual"],"kendoDropTarget":["group"],"kendoDropTargetArea":["filter","group"],"kendoEditor":["domain","encoded","fileBrowser","imageBrowser","messages","name","pdf","resizable","serialization","stylesheets","tools"],"kendoFlatColorPicker":["autoupdate","buttons","messages","name","opacity","preview","value"],"kendoGantt":["assignments","autoBind","columnResizeHandleWidth","columns","currentTimeMarker","dataSource","dependencies","editable","height","hourSpan","listWidth","messages","name","navigatable","pdf","resizable","resources","rowHeight","selectable","showWorkDays","showWorkHours","snap","taskTemplate","toolbar","tooltip","views","workDayEnd","workDayStart","workWeekEnd","workWeekStart"],"kendoGrid":["allowCopy","altRowTemplate","autoBind","columnMenu","columnResizeHandleWidth","columns","dataSource","detailTemplate","editable","excel","filterable","groupable","height","messages","mobile","name","navigatable","noRecords","pageable","pdf","reorderable","resizable","rowTemplate","scrollable","selectable","sortable","toolbar"],"kendoLinearGauge":["gaugeArea","name","pointer","renderAs","scale","transitions"],"kendoListView":["altTemplate","autoBind","dataSource","editTemplate","name","navigatable","selectable","template"],"kendoMap":["center","controls","layerDefaults","layers","markerDefaults","markers","maxZoom","minSize","minZoom","name","pannable","wraparound","zoom","zoomable"],"kendoMaskedTextBox":["clearPromptChar","culture","mask","name","promptChar","rules","unmaskOnPost","value"],"kendoMenu":["animation","closeOnClick","dataSource","direction","hoverDelay","name","openOnClick","orientation","popupCollision"],"kendoMobileActionSheet":["cancel","name","popup","type"],"kendoMobileBackButton":["name"],"kendoMobileButton":["badge","clickOn","enable","icon","name"],"kendoMobileButtonGroup":["enable","index","name","selectOn"],"kendoMobileCollapsible":["animation","collapsed","expandIcon","iconPosition","inset","name"],"kendoMobileDetailButton":["name"],"kendoMobileDrawer":["container","name","position","swipeToOpen","swipeToOpenViews","title","views"],"kendoMobileLayout":["id","name","platform"],"kendoMobileListView":["appendOnRefresh","autoBind","dataSource","endlessScroll","filterable","fixedHeaders","headerTemplate","loadMore","messages","name","pullParameters","pullToRefresh","style","template","type","virtualViewSize"],"kendoMobileLoader":["name"],"kendoMobileModalView":["height","modal","name","width"],"kendoMobileNavBar":["name"],"kendoMobilePane":["collapsible","initial","layout","loading","name","portraitWidth","transition"],"kendoMobilePopOver":["name","pane","popup"],"kendoMobileScrollView":["autoBind","bounceVelocityThreshold","contentHeight","dataSource","duration","emptyTemplate","enablePager","itemsPerPage","name","page","pageSize","template","velocityThreshold"],"kendoMobileScroller":["elastic","messages","name","pullOffset","pullToRefresh","useNative","visibleScrollHints","zoom"],"kendoMobileSplitView":["name","style"],"kendoMobileSwitch":["checked","enable","name","offLabel","onLabel"],"kendoMobileTabStrip":["name","selectedIndex"],"kendoMobileView":["model","name","reload","scroller","stretch","title","useNativeScrolling","zoom"],"kendoMultiSelect":["animation","autoBind","autoClose","dataSource","dataTextField","dataValueField","delay","enable","filter","fixedGroupTemplate","groupTemplate","headerTemplate","height","highlightFirst","ignoreCase","itemTemplate","maxSelectedItems","minLength","name","placeholder","popup","tagMode","tagTemplate","value","valuePrimitive","virtual"],"kendoNotification":["allowHideAfter","animation","appendTo","autoHideAfter","button","height","hideOnClick","name","position","stacking","templates","width"],"kendoNumericTextBox":["culture","decimals","downArrowText","format","max","min","name","placeholder","spinners","step","upArrowText","value"],"kendoPager":["autoBind","buttonCount","dataSource","info","input","linkTemplate","messages","name","numeric","pageSizes","previousNext","refresh","selectTemplate"],"kendoPanelBar":["animation","contentUrls","dataSource","expandMode","name"],"kendoPivotConfigurator":["dataSource","filterable","height","messages","name","sortable"],"kendoPivotGrid":["autoBind","columnHeaderTemplate","columnWidth","dataCellTemplate","dataSource","excel","filterable","height","kpiStatusTemplate","kpiTrendTemplate","messages","name","pdf","reorderable","rowHeaderTemplate","sortable"],"kendoPopup":["anchor","animation","appendTo","name","origin","position"],"kendoProgressBar":["animation","chunkCount","enable","max","min","name","orientation","reverse","showStatus","type","value"],"kendoQRCode":["background","border","color","encoding","errorCorrection","name","padding","renderAs","size","value"],"kendoRadialGauge":["gaugeArea","name","pointer","renderAs","scale","transitions"],"kendoRangeSlider":["largeStep","max","min","name","orientation","selectionEnd","selectionStart","smallStep","tickPlacement","tooltip"],"kendoResponsivePanel":["autoClose","breakpoint","name","orientation","toggleButton"],"kendoScheduler":["allDayEventTemplate","allDaySlot","autoBind","currentTimeMarker","dataSource","date","dateHeaderTemplate","editable","endTime","eventTemplate","footer","group","groupHeaderTemplate","height","majorTick","majorTimeHeaderTemplate","max","messages","min","minorTickCount","minorTimeHeaderTemplate","mobile","name","pdf","resources","selectable","showWorkHours","snap","startTime","timezone","toolbar","views","width","workDayEnd","workDayStart","workWeekEnd","workWeekStart"],"kendoSlider":["decreaseButtonTitle","increaseButtonTitle","largeStep","max","min","name","orientation","showButtons","smallStep","tickPlacement","tooltip","value"],"kendoSortable":["autoScroll","axis","connectWith","container","cursor","cursorOffset","disabled","filter","handler","hint","holdToDrag","ignore","name","placeholder"],"kendoSparkline":["autoBind","axisDefaults","categoryAxis","chartArea","data","dataSource","name","plotArea","pointWidth","renderAs","series","seriesColors","seriesDefaults","theme","tooltip","transitions","type","valueAxis"],"kendoSplitter":["name","orientation","panes"],"kendoSpreadsheet":["activeSheet","columnWidth","columns","excel","headerHeight","headerWidth","name","pdf","rowHeight","rows","sheets","sheetsbar","toolbar"],"kendoStockChart":["autoBind","axisDefaults","categoryAxis","chartArea","dataSource","dateField","legend","name","navigator","panes","pdf","plotArea","renderAs","series","seriesColors","seriesDefaults","theme","title","tooltip","transitions","valueAxis"],"kendoTabStrip":["animation","collapsible","contentUrls","dataContentField","dataContentUrlField","dataImageUrlField","dataSource","dataSpriteCssClass","dataTextField","dataUrlField","name","navigatable","scrollable","tabPosition","value"],"kendoTimePicker":["animation","culture","dates","format","interval","max","min","name","parseFormats","value"],"kendoToolBar":["items","name","resizable"],"kendoTooltip":["animation","autoHide","callout","content","filter","height","iframe","name","position","showAfter","showOn","width"],"kendoTouch":["doubleTapTimeout","enableSwipe","filter","maxDuration","maxYDelta","minHold","minXDelta","multiTouch","name","surface"],"kendoTreeList":["autoBind","columnMenu","columns","dataSource","editable","excel","filterable","height","messages","name","pdf","reorderable","resizable","scrollable","selectable","sortable","toolbar"],"kendoTreeMap":["autoBind","colorField","colors","dataSource","name","template","textField","theme","type","valueField"],"kendoTreeView":["animation","autoBind","autoScroll","checkboxes","dataImageUrlField","dataSource","dataSpriteCssClassField","dataTextField","dataUrlField","dragAndDrop","loadOnDemand","messages","name","template"],"kendoUpload":["async","enabled","files","localization","multiple","name","showFileList","template"],"kendoValidator":["errorTemplate","messages","name","rules","validateOnBlur"],"kendoWindow":["actions","animation","appendTo","autoFocus","content","draggable","height","iframe","maxHeight","maxWidth","minHeight","minWidth","modal","name","pinned","position","resizable","scrollable","title","visible","width"],"GridColumn":["aggregates","attributes","columns","command","encoded","field","filterable","footerTemplate","format","groupFooterTemplate","groupHeaderTemplate","groupable","headerAttributes","headerTemplate","hidden","lockable","locked","menu","minScreenWidth","sortable","template","title","values","width","editor"],"TreeListColumn":["attributes","command","encoded","expandable","field","filterable","footerTemplate","format","headerAttributes","headerTemplate","hidden","lockable","locked","menu","minScreenWidth","sortable","template","title","width","editor"]}
export const constants = {
  eventPrefix: 'k-on-',
  bindablePrefix: 'k-',
  attributePrefix: 'k-',
  elementPrefix: 'k-'
};

/***
* Available properties (merged together from several locations) are stored here per controlName
* so that this isn't done for each created wrapper instance
*/
export class ControlProperties {
  cache = [];
  templateProperties = [];

  /**
  * Merges together available properties for a specific control
  * and stores this in a cache so that this is done only once per control
  */
  getProperties(controlName) {
    if (this.cache[controlName]) {
      return this.cache[controlName];
    }

    // get available properties of the options object inside a Kendo control
    let options1 = this.getWidgetProperties(controlName);
    // get available properties of the pre-generated bindables.json file
    let options2 = bindables[controlName];

    if (!options2) {
      throw new Error(`${controlName} not found in generated bindables.js`);
    }

    // merge together without duplicates
    let keys = options1.concat(options2.filter(item => options1.indexOf(item) < 0));

    this.cache[controlName] = keys;

    return keys;
  }

  getWidgetProperties(controlName) {
    if (jQuery.fn[controlName]) {
      return Object.keys(jQuery.fn[controlName].widget.prototype.options);
    }

    return [];
  }

  getTemplateProperties(controlName) {
    let properties = this.getProperties(controlName);

    let templates = properties.filter(prop => prop.toLowerCase().indexOf('template') >= -1);

    return templates;
  }
}

/**
* Creates a BindableProperty for every option defined in a Kendo control
* in the option property of a Kendo control
* @param controlName The Kendo control of which the options should be converted into bindable properties
*/
export function generateBindables(controlName: string) {
  return function(target, key, descriptor) {
    // get or create the HtmlBehaviorResource
    // on which we're going to create the BindableProperty's
    let behaviorResource = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, target);
    let controlProperties = (Container.instance || new Container()).get(ControlProperties);
    let optionKeys = controlProperties.getProperties(controlName);

    optionKeys.push('widget');

    for (let option of optionKeys) {
      // set the name of the bindable property to the option
      let nameOrConfigOrTarget = {
        name: getBindablePropertyName(option)
      };

      if (option === 'widget') {
        nameOrConfigOrTarget.defaultBindingMode = bindingMode.twoWay;
      }

      let prop = new BindableProperty(nameOrConfigOrTarget);
      prop.registerWith(target, behaviorResource, descriptor);
    }
  };
}

@customElement(`${constants.elementPrefix}template`)
@noView()
@processContent((compiler, resources, element, instruction) => {
  let html = element.innerHTML;
  if (html !== '') {
    instruction.template = html;
  }
  return true;
})
@inject(TargetInstruction)
export class Template {
  @bindable template;
  @bindable for = 'template';

  constructor(targetInstruction) {
    this.template = targetInstruction.elementInstruction.template;
  }
}

/***
* Converts an object with bindable properties (with k- convention)
* into an object that can be passed to a Kendo control
*/
@inject(ControlProperties)
export class OptionsBuilder {

  constructor(controlProperties) {
    this.controlProperties = controlProperties;
  }

  /**
  * converts properties of view-model (with k- convention) to an object
  * that can be passed to a Kendo control. It also wraps templates into a function
  * so the Kendo templating system is not used
  */
  getOptions(viewModel, className) {
    let options = {};

    for (let prop of this.controlProperties.getProperties(className)) {
      let value = viewModel[getBindablePropertyName(prop)];

      if (hasValue(value)) {
        if (this.isTemplate(prop)) {
          options[prop] = () => value;
        } else {
          options[prop] = value;
        }
      }
    }

    return pruneOptions(options);
  }

  isTemplate(propertyName) {
    return propertyName.toLowerCase().indexOf('template') > -1;
  }
}

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

    // pull the parent context of the widget, or of the options
    // in some cases, templates are compiled when a Kendo control's constructor is called
    // in these cases we get the parent context of the options instead of the
    // widget
    let $parent = widget._$parent || (widget.options._$parent ? widget.options._$parent[0] : undefined);
    let viewResources = widget._$resources || (widget.options._$resources ? widget.options._$resources[0] : undefined);

    if (!$parent) return;

    let args = _args();
    let elements = args.elements; // extract elements from the args
    let data = args.data; // extract the dataitems from the args

    switch (_event) {
    case 'compile':
      // we need to pass elements and data to compile
      // so that Aurelia can enhance this elements with the correct
      // binding context
      this.compile($parent, elements, data, viewResources);
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
  compile($parent, elements, data, viewResources) {
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let ctx;

      if (data && data[i]) {
        let _data = data[i];
        ctx = _data.dataItem || _data.aggregate || _data;
      }

      if (element instanceof jQuery) {
        element.each((index, elem) => this.enhanceView($parent, elem, ctx, viewResources));
      } else {
        this.enhanceView($parent, element, ctx, viewResources);
      }
    }
  }

  /**
  * uses the enhance function of Aurelia's TemplatingEngine
  * to "compile" existing DOM elements
  * @param element The Element to compile
  * @param ctx The dataitem (context) to compile the Element with
  */
  enhanceView($parent, element, ctx, viewResources) {
    let view = $(element).data('viewInstance');

    // check necessary due to https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge/issues/308
    if (element.querySelectorAll('.au-target').length === 0) {
      if (viewResources) {
        view = this.templatingEngine.enhance({
          element: element,
          resources: viewResources
        });
      } else {
        view = this.templatingEngine.enhance(element);
      }

      // when we do cleanup, we need to get the view instance
      // so we can call detached/unbind
      // so we store this view instance in the DOM element using JQuery.data
      $(element).data('viewInstance', view);
    }

    view.bind(ctx, $parent); // call the bind() function on the view with the dataItem we got from Kendo
    view.attached(); // attach it to the DOM
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

const capitalMatcher = /([A-Z])/g;
/**
* prepends hyphen and lowercases the input char
* @param char the char to add an hyphen in front for
*/
export function addHyphenAndLower(char: string): string {
  return '-' + char.toLowerCase();
}

/**
* hyphenates a string
* kTest -> k-test
* @param name the string to hyphenate
*/
export function _hyphenate(name: string): string {
  return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
}

/**
* unhyphenate's a string
* k-test -> kTest
*/
export function _unhyphenate(name: string): string {
  return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
* prepends prefix and unhyphenates the resulting string
* test -> kTest
*/
export function getBindablePropertyName(propertyName: string): string {
  let name = `${constants.bindablePrefix}${propertyName}`;

  return _unhyphenate(name);
}

/**
* removes prefix and unhyphenates the resulting string
* kTest -> test
*/
export function getKendoPropertyName(propertyName: string): string {
  let withoutPrefix = propertyName.substring(1); // remove 'k'

  return (withoutPrefix.charAt(0).toLowerCase() + withoutPrefix.slice(1));
}

/**
* converts all attributes found on an element to matching Kendo events
* returns a list of these Kendo events
*/
export function getEventsFromAttributes(element: Element): string[] {
  let attributes = Array.prototype.slice.call(element.attributes);
  let events: string[] = [];

  for (let attribute of attributes) {
    let attributeName = attribute.name;
    if (!attributeName.startsWith(constants.eventPrefix)) continue;

    // kendo-my-event.trigger -> my-event.trigger
    let hyphenatedEvent = attributeName.split(constants.eventPrefix)[1];

    // my-event.trigger -> my-event
    let withoutTriggerDelegate = hyphenatedEvent.split('.')[0];

    // my-event -> myEvent
    let camelCased = _unhyphenate(withoutTriggerDelegate);

    events.push(camelCased);
  }

  return events;
}


/**
* Implicitly setting options to "undefined" for a kendo control can break things.
* this function prunes the supplied options object and removes values that
* aren't set to something explicit (i.e. not null)
* @param options the options object to prune the properties of
*/
export function pruneOptions(options: any) {
  let returnOptions = {};

  for (let prop in options) {
    if (hasValue(options[prop])) {
      returnOptions[prop] = options[prop];
    }
  }

  return returnOptions;
}

export function hasValue(prop) {
  return typeof(prop) !== 'undefined' && prop !== null;
}


/***
* parses array of k-template view-models (@children)
* <k-template for='test'>
* this function sets the property 'test' on the viewmodel to the template
* @param target the viewModel with template properties
* @param kendoGrid or GridColumn, properties are retrieved from bindables.js
* @param templates array of k-template view-models
*/
export function useTemplates(target, controlName, templates) {
  let controlProperties = (Container.instance || new Container()).get(ControlProperties);
  let templateProps = controlProperties.getTemplateProperties(controlName);

  templates.forEach(c => {
    if (templateProps.indexOf(c.for) > -1) {
      target[getBindablePropertyName(c.for)] = c.template;
    } else {
      throw new Error('Invalid template property name: "' + c.for + '", valid values are: ' + templateProps.join(', '));
    }
  });
}


/**
* Fire DOM event on an element
* @param element The Element which the DOM event will be fired on
* @param name The Event's name
* @param data Addition data to attach to an event
*/
export function fireEvent(element: Element, name: string, data = {}) {
  let event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

/**
* Fire DOM event on an element with the k-on prefix
* @param element The Element which the DOM event will be fired on
* @param name The Event's name, without k-on prefix
* @param data Addition data to attach to an event
*/
export function fireKendoEvent(element: Element, name: string, data = {}) {
  return fireEvent(element, `${constants.eventPrefix}${name}`, data);
}

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

@customElement(`${constants.elementPrefix}grid`)
@generateBindables('kendoGrid')
@inject(Element, WidgetBase, ViewResources, OptionsBuilder)
export class Grid  {

  @children(`${constants.elementPrefix}col`) columns;
  @bindable options = {};

  constructor(element, widgetBase, viewResources, optionsBuilder) {
    this.element = element;
    this.optionsBuilder = optionsBuilder;
    this.widgetBase = widgetBase
                        .control('kendoGrid')
                        .linkViewModel(this)
                        .useViewResources(viewResources);
  }

  bind(ctx) {
    this.$parent = ctx;
  }

  // initialization in bind() is giving issues in some scenarios
  // so, attached() is used for this control
  attached() {
    this.recreate();
  }

  recreate() {
    // init grid on the <table> tag if initialization is from table
    // else, just use the root element
    let element = isInitFromTable(this.element) ? this.element.children[0] : this.element;

    this.kWidget = this.widgetBase.createWidget({
      element: element,
      parentCtx: this.$parent,
      beforeInitialize: (o) => this._beforeInitialize(o)
    });
  }

  _beforeInitialize(options) {
    // allow for both column definitions via HTML and via an array of columns
    if (this.columns && this.columns.length > 0) {
      options.columns = [];

      this.columns.forEach(column => {
        options.columns.push(this.optionsBuilder.getOptions(column, 'GridColumn'));
      });
    }
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

// if the first child node is a table tag
// then the user wants to initialize the Kendo Grid from an
// existing table
function isInitFromTable(element) {
  return element.children.length > 0 && element.children[0].nodeName === 'TABLE';
}

@customElement(`${constants.elementPrefix}col`)
@generateBindables('GridColumn')
export class Col {
  @children(`${constants.elementPrefix}template`) templates;

  bind() {
    useTemplates(this, 'GridColumn', this.templates);
  }
}

export class kendoToStringValueConverter {
  toView(value, format, language) {
    return kendo.toString(value, format, language);
  }
}

export class kendoParseDateValueConverter {
  toView(value, format, language) {
    return kendo.parseDate(value, format, language);
  }
}

export class kendoParseIntValueConverter {
  toView(value, language) {
    return kendo.parseInt(value, language);
  }
}

export class kendoParseFloatValueConverter {
  toView(value, language) {
    return kendo.parseFloat(value, language);
  }
}

export class kendoParseColorValueConverter {
  toView(value) {
    return kendo.parseColor(value);
  }
}

export class kendoStringifyValueConverter {
  toView(obj) {
    return kendo.stringify(obj);
  }
}

export class kendoFormatValueConverter {
  toView(value, ...params) {
    params.unshift(value);

    return kendo.format.apply(this, params);
  }
}

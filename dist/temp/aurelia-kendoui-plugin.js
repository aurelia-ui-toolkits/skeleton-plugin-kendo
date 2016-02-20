'use strict';

exports.__esModule = true;

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

exports.configure = configure;
exports.generateBindables = generateBindables;
exports.fireEvent = fireEvent;
exports.fireKendoEvent = fireKendoEvent;
exports.pruneOptions = pruneOptions;
exports.addHyphenAndLower = addHyphenAndLower;
exports._hyphenate = _hyphenate;
exports._unhyphenate = _unhyphenate;
exports.getBindablePropertyName = getBindablePropertyName;
exports.getEventsFromAttributes = getEventsFromAttributes;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

require('jquery');

require('kendo-ui/js/kendo.autocomplete.min');

require('kendo-ui/js/kendo.virtuallist.min');

require('kendo-ui/js/kendo.button.min');

require('kendo-ui/js/kendo.dataviz.chart.min');

require('kendo-ui/js/kendo.data.signalr.min');

require('kendo-ui/js/kendo.filtercell.min');

require('kendo-ui/js/kendo.grid.min');

var _aureliaFramework = require('aurelia-framework');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var KendoConfigBuilder = (function () {
  function KendoConfigBuilder() {
    _classCallCheck(this, KendoConfigBuilder);

    this.resources = [];
    this.useGlobalResources = true;
  }

  KendoConfigBuilder.prototype.core = function core() {
    this.kendoButton().kendoTabStrip().kendoProgressBar().kendoSlider().kendoColorPicker().kendoDropDownList();
    return this;
  };

  KendoConfigBuilder.prototype.pro = function pro() {
    this.core().kendoGrid().kendoAutoComplete().kendoChart();
    return this;
  };

  KendoConfigBuilder.prototype.withoutGlobalResources = function withoutGlobalResources() {
    this.useGlobalResources = false;
    return this;
  };

  KendoConfigBuilder.prototype.kendoAutoComplete = function kendoAutoComplete() {
    this.resources.push('autocomplete/autocomplete');
    return this;
  };

  KendoConfigBuilder.prototype.kendoButton = function kendoButton() {
    this.resources.push('button/button');
    return this;
  };

  KendoConfigBuilder.prototype.kendoGrid = function kendoGrid() {
    this.resources.push('grid/grid');
    this.resources.push('grid/k-col');
    return this;
  };

  KendoConfigBuilder.prototype.kendoChart = function kendoChart() {
    this.resources.push('chart/chart');
    return this;
  };

  return KendoConfigBuilder;
})();

exports.KendoConfigBuilder = KendoConfigBuilder;

var logger = LogManager.getLogger('aurelia-kendoui-plugin');

function configure(aurelia, configCallback) {
  var builder = new KendoConfigBuilder();

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(builder);
  }

  if (builder.resources.length === 0) {
    logger.warn('Nothing specified for kendo configuration - using defaults for Kendo Core');
    builder.core();
  }

  var resources = builder.resources;

  if (builder.useGlobalResources) {
    aurelia.globalResources(resources);
  }
}

var AutoComplete = (function (_WidgetBase) {
  var _instanceInitializers = {};

  _inherits(AutoComplete, _WidgetBase);

  _createDecoratedClass(AutoComplete, [{
    key: 'kDataSource',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'options',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }], null, _instanceInitializers);

  function AutoComplete(element) {
    _classCallCheck(this, _AutoComplete);

    _WidgetBase.call(this, 'kendoAutoComplete', element);

    _defineDecoratedPropertyDescriptor(this, 'kDataSource', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);
  }

  AutoComplete.prototype.bind = function bind(ctx) {
    _WidgetBase.prototype.bind.call(this, ctx);

    this._initialize();
  };

  AutoComplete.prototype._initialize = function _initialize() {
    var _this2 = this;

    _WidgetBase.prototype._initialize.call(this);

    this.widget.bind('change', function (event) {
      _this2.kValue = event.sender.value();

      fireEvent(_this2.element, 'input');
    });

    this.widget.bind('select', function (event) {
      _this2.kValue = event.sender.value();

      fireEvent(_this2.element, 'input');
    });
  };

  AutoComplete.prototype.kEnableChanged = function kEnableChanged() {
    if (this.widget) {
      this.widget.enable(this.kEnable);
    }
  };

  AutoComplete.prototype.enable = function enable(newValue) {
    if (this.widget) {
      return this.widget.enable(newValue);
    }
  };

  AutoComplete.prototype.value = function value(newValue) {
    if (this.widget) {
      if (newValue) {
        this.widget.value(newValue);
        this.widget.trigger('change');
      } else {
        return this.widget.value();
      }
    }
  };

  AutoComplete.prototype.search = function search(value) {
    if (this.widget) {
      this.widget.search(value);
    }
  };

  AutoComplete.prototype.close = function close(value) {
    if (this.widget) {
      return this.widget.close(value);
    }
  };

  AutoComplete.prototype.dataItem = function dataItem(value) {
    if (this.widget) {
      return this.widget.dataItem(value);
    }
  };

  AutoComplete.prototype.destroy = function destroy() {
    if (this.widget) {
      return this.widget.destroy();
    }
  };

  AutoComplete.prototype.focus = function focus() {
    if (this.widget) {
      return this.widget.focus();
    }
  };

  AutoComplete.prototype.readonly = function readonly(value) {
    if (this.widget) {
      return this.widget.readonly(value);
    }
  };

  AutoComplete.prototype.refresh = function refresh() {
    if (this.widget) {
      return this.widget.refresh();
    }
  };

  AutoComplete.prototype.select = function select(value) {
    if (this.widget) {
      return this.widget.select(value);
    }
  };

  AutoComplete.prototype.setDataSource = function setDataSource(value) {
    if (this.widget) {
      return this.widget.setDataSource(value);
    }
  };

  AutoComplete.prototype.suggest = function suggest(value) {
    if (this.widget) {
      return this.widget.suggest(value);
    }
  };

  var _AutoComplete = AutoComplete;
  AutoComplete = generateBindables('kendoAutoComplete')(AutoComplete) || AutoComplete;
  AutoComplete = _aureliaFramework.inject(Element)(AutoComplete) || AutoComplete;
  AutoComplete = _aureliaFramework.customAttribute('k-autocomplete')(AutoComplete) || AutoComplete;
  return AutoComplete;
})(WidgetBase);

exports.AutoComplete = AutoComplete;

var Button = (function (_WidgetBase2) {
  var _instanceInitializers2 = {};

  _inherits(Button, _WidgetBase2);

  _createDecoratedClass(Button, [{
    key: 'options',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }], null, _instanceInitializers2);

  function Button(element) {
    _classCallCheck(this, _Button);

    _WidgetBase2.call(this, 'kendoButton', element);

    _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers2);
  }

  Button.prototype.bind = function bind(ctx) {
    _WidgetBase2.prototype.bind.call(this, ctx);

    this._initialize();
  };

  Button.prototype.kEnableChanged = function kEnableChanged() {
    if (this.widget) {
      this.widget.enable(this.kEnable);
    }
  };

  Button.prototype.enable = function enable(_enable) {
    if (this.widget) {
      this.widget.enable(_enable);
    }
  };

  var _Button = Button;
  Button = _aureliaFramework.inject(Element)(Button) || Button;
  Button = generateBindables('kendoButton')(Button) || Button;
  Button = _aureliaFramework.customAttribute('k-button')(Button) || Button;
  return Button;
})(WidgetBase);

exports.Button = Button;

var Chart = (function (_WidgetBase3) {
  var _instanceInitializers3 = {};

  _inherits(Chart, _WidgetBase3);

  _createDecoratedClass(Chart, [{
    key: 'kDataSource',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'options',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }], null, _instanceInitializers3);

  function Chart(element) {
    _classCallCheck(this, _Chart);

    _WidgetBase3.call(this, 'kendoChart', element);

    _defineDecoratedPropertyDescriptor(this, 'kDataSource', _instanceInitializers3);

    _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers3);
  }

  Chart.prototype.attached = function attached() {
    this._initialize();
  };

  Chart.prototype.getAxis = function getAxis(name) {
    if (this.widget) {
      return this.widget.getAxis(name);
    }
  };

  Chart.prototype.redraw = function redraw() {
    if (this.widget) {
      return this.widget.redraw();
    }
  };

  Chart.prototype.refresh = function refresh() {
    if (this.widget) {
      return this.widget.refresh();
    }
  };

  Chart.prototype.resize = function resize() {
    if (this.widget) {
      return this.widget.resize();
    }
  };

  Chart.prototype.setDataSource = function setDataSource(dataSource) {
    if (this.widget) {
      return this.widget.setDataSource(dataSource);
    }
  };

  Chart.prototype.setOptions = function setOptions(value) {
    if (this.widget) {
      return this.widget.setOptions(value);
    }
  };

  Chart.prototype.imageDataURL = function imageDataURL() {
    if (this.widget) {
      return this.widget.imageDataURL();
    }
  };

  Chart.prototype.toggleHighlight = function toggleHighlight(show, options) {
    if (this.widget) {
      return this.widget.toggleHighlight(show, options);
    }
  };

  Chart.prototype.destroy = function destroy() {
    if (this.widget) {
      return this.widget.destroy();
    }
  };

  var _Chart = Chart;
  Chart = _aureliaFramework.inject(Element)(Chart) || Chart;
  Chart = generateBindables('kendoChart')(Chart) || Chart;
  Chart = _aureliaFramework.customElement('k-chart')(Chart) || Chart;
  return Chart;
})(WidgetBase);

exports.Chart = Chart;
var constants = {
  eventPrefix: 'k-on-',
  bindablePrefix: 'k-'
};

exports.constants = constants;

function generateBindables(controlName) {
  return function (target, key, descriptor) {
    var options = jQuery.fn[controlName].widget.prototype.options;

    var behaviorResource = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, _aureliaTemplating.HtmlBehaviorResource, target);
    var optionKeys = Object.keys(options);
    optionKeys.push('dataSource');

    for (var _iterator = optionKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var option = _ref;

      var nameOrConfigOrTarget = {
        name: getBindablePropertyName(option)
      };

      var prop = new _aureliaTemplating.BindableProperty(nameOrConfigOrTarget);
      prop.registerWith(target, behaviorResource, descriptor);
    }
  };
}

function fireEvent(element, name) {
  var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

function fireKendoEvent(element, name) {
  var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  return fireEvent(element, '' + constants.eventPrefix + name, data);
}

function pruneOptions(options) {
  var returnOptions = {};

  for (var prop in options) {
    if (options.hasOwnProperty(prop) && options[prop] !== null) {
      returnOptions[prop] = options[prop];
    }
  }

  return returnOptions;
}

var TemplateCompiler = (function () {
  function TemplateCompiler(templatingEngine) {
    _classCallCheck(this, _TemplateCompiler);

    this.isInitialized = false;

    this.templatingEngine = templatingEngine;
  }

  TemplateCompiler.prototype.initialize = function initialize() {
    if (this.isInitialized) return;

    var _this = this;
    kendo.ui.Widget.prototype.angular = function (_event, _args) {
      _this.handleTemplateEvents(this, _event, _args);
    };
    kendo.mobile.ui.Widget.prototype.angular = function (_event, _args) {
      _this.handleTemplateEvents(this, _event, _args);
    };

    this.isInitialized = true;
  };

  TemplateCompiler.prototype.handleTemplateEvents = function handleTemplateEvents(widget, _event, _args) {
    if (_event !== 'compile' && _event !== 'cleanup') return;

    var $parent = widget._$parent;

    if (!$parent) return;

    var args = _args();
    var elements = args.elements;
    var data = args.data;

    switch (_event) {
      case 'compile':
        this.compile($parent, elements, data);
        break;

      case 'cleanup':
        this.cleanup(elements);
        break;

      default:
        break;
    }
  };

  TemplateCompiler.prototype.compile = function compile($parent, elements, data) {
    var _this3 = this;

    var _loop = function (i) {
      var element = elements[i];
      var ctx = undefined;

      if (data && data[i]) {
        var _data = data[i];
        ctx = _data.dataItem;
      }

      if (element instanceof jQuery) {
        element.each(function (index, elem) {
          return _this3.enhanceView($parent, elem, ctx);
        });
      } else {
        _this3.enhanceView($parent, element, ctx);
      }
    };

    for (var i = 0; i < elements.length; i++) {
      _loop(i);
    }
  };

  TemplateCompiler.prototype.enhanceView = function enhanceView($parent, element, ctx) {
    var view = this.templatingEngine.enhance(element);

    view.bind(ctx, $parent);
    view.attached();
    $(element).data('viewInstance', view);
  };

  TemplateCompiler.prototype.cleanup = function cleanup(elements) {
    if (!elements) return;

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      this.cleanupView(element);
    }
  };

  TemplateCompiler.prototype.cleanupView = function cleanupView(element) {
    var view = $(element).data('viewInstance');
    if (!view) return;

    view.detached();
    view.unbind();
  };

  var _TemplateCompiler = TemplateCompiler;
  TemplateCompiler = _aureliaFramework.inject(_aureliaTemplating.TemplatingEngine)(TemplateCompiler) || TemplateCompiler;
  return TemplateCompiler;
})();

exports.TemplateCompiler = TemplateCompiler;

var capitalMatcher = /([A-Z])/g;

function addHyphenAndLower(char) {
  return '-' + char.toLowerCase();
}

function _hyphenate(name) {
  return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
}

function _unhyphenate(name) {
  return name.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

function getBindablePropertyName(propertyName) {
  var name = '' + constants.bindablePrefix + propertyName;

  return _unhyphenate(name);
}

function getEventsFromAttributes(element) {
  var attributes = Array.prototype.slice.call(element.attributes);
  var events = [];

  for (var _iterator2 = attributes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var attribute = _ref2;

    var attributeName = attribute.name;
    if (!attributeName.startsWith(constants.eventPrefix)) continue;

    var hyphenatedEvent = attributeName.split(constants.eventPrefix)[1];

    var withoutTriggerDelegate = hyphenatedEvent.split('.')[0];

    var camelCased = _unhyphenate(withoutTriggerDelegate);

    events.push(camelCased);
  }

  return events;
}

var WidgetBase = (function () {
  function WidgetBase(controlName, element) {
    _classCallCheck(this, WidgetBase);

    var container = _aureliaDependencyInjection.Container.instance;
    this.taskQueue = container.get(_aureliaFramework.TaskQueue);
    this.templateCompiler = container.get(TemplateCompiler);
    this.templateCompiler.initialize();

    this.element = element;

    this.target = this.element;

    this.controlName = controlName;

    this.setDefaultBindableValues();
  }

  WidgetBase.prototype.bind = function bind(ctx) {
    this.$parent = ctx;
  };

  WidgetBase.prototype._initialize = function _initialize() {
    if (!this.$parent) {
      throw new Error('$parent is not set. Did you call bind(ctx) on the widget base?');
    }

    var target = jQuery(this.target);

    var ctor = target[this.controlName];

    var options = this._getOptions(ctor);

    this._beforeInitialize(options);

    this.widget = ctor.call(target, options).data(this.controlName);

    this.widget._$parent = this.$parent;

    this._initialized();
  };

  WidgetBase.prototype._beforeInitialize = function _beforeInitialize(options) {};

  WidgetBase.prototype._initialized = function _initialized() {};

  WidgetBase.prototype.recreate = function recreate() {
    this._initialize();
  };

  WidgetBase.prototype._getOptions = function _getOptions(ctor) {
    var options = this.getOptionsFromBindables();
    var eventOptions = this.getEventOptions(ctor);

    return Object.assign({}, this.options, pruneOptions(options), eventOptions);
  };

  WidgetBase.prototype.getOptionsFromBindables = function getOptionsFromBindables() {
    var props = jQuery.fn[this.controlName].widget.prototype.options;
    var options = {};

    for (var _iterator3 = Object.keys(props), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var prop = _ref3;

      options[prop] = this[getBindablePropertyName(prop)];
    }

    if (this.kDataSource) {
      options.dataSource = this.kDataSource;
    }

    return options;
  };

  WidgetBase.prototype.setDefaultBindableValues = function setDefaultBindableValues() {
    var props = jQuery.fn[this.controlName].widget.prototype.options;

    for (var _iterator4 = Object.keys(props), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var prop = _ref4;

      this[getBindablePropertyName(prop)] = props[prop];
    }
  };

  WidgetBase.prototype.getEventOptions = function getEventOptions(ctor) {
    var _this4 = this;

    var options = {};
    var allowedEvents = ctor.widget.prototype.events;

    var events = getEventsFromAttributes(this.element);

    events.forEach(function (event) {
      if (!allowedEvents.includes(event)) {
        throw new Error(event + ' is not an event on the ' + _this4.controlName + ' control');
      }

      options[event] = function (e) {
        _this4.taskQueue.queueMicroTask(function () {
          fireKendoEvent(_this4.target, _hyphenate(event), e);
        });
      };
    });

    return options;
  };

  WidgetBase.prototype.detached = function detached() {
    if (this.widget) {
      this.widget.destroy();
    }
  };

  return WidgetBase;
})();

exports.WidgetBase = WidgetBase;

var Grid = (function (_WidgetBase4) {
  var _instanceInitializers4 = {};

  _inherits(Grid, _WidgetBase4);

  _createDecoratedClass(Grid, [{
    key: 'columns',
    decorators: [_aureliaFramework.children('au-col')],
    initializer: null,
    enumerable: true
  }, {
    key: 'kDataSource',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'options',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }], null, _instanceInitializers4);

  function Grid(element) {
    _classCallCheck(this, _Grid);

    _WidgetBase4.call(this, 'kendoGrid', element);

    _defineDecoratedPropertyDescriptor(this, 'columns', _instanceInitializers4);

    _defineDecoratedPropertyDescriptor(this, 'kDataSource', _instanceInitializers4);

    _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers4);
  }

  Grid.prototype.attached = function attached() {
    this._initialize();
  };

  Grid.prototype._initialize = function _initialize() {
    this.target = isInitFromTable(this.element) ? this.element.children[0] : this.element;

    _WidgetBase4.prototype._initialize.call(this);
  };

  Grid.prototype._beforeInitialize = function _beforeInitialize(options) {
    if (this.columns && this.columns.length > 0) {
      options.columns = this.columns;
    }
  };

  Grid.prototype.enableChanged = function enableChanged(newValue) {
    if (this.widget) {
      this.widget.enable(newValue);
    }
  };

  Grid.prototype.addRow = function addRow() {
    if (this.widget) {
      this.widget.addRow();
    }
  };

  Grid.prototype.autoFitColumn = function autoFitColumn(value) {
    if (this.widget) {
      this.widget.autoFitColumn(value);
    }
  };

  Grid.prototype.cancelChanges = function cancelChanges() {
    if (this.widget) {
      this.widget.cancelChanges();
    }
  };

  Grid.prototype.cancelRow = function cancelRow() {
    if (this.widget) {
      this.widget.cancelRow();
    }
  };

  Grid.prototype.cellIndex = function cellIndex(cell) {
    if (this.widget) {
      return this.widget.cellIndex(cell);
    }
  };

  Grid.prototype.clearSelection = function clearSelection() {
    if (this.widget) {
      this.widget.clearSelection();
    }
  };

  Grid.prototype.closeCell = function closeCell() {
    if (this.widget) {
      this.widget.closeCell();
    }
  };

  Grid.prototype.collapseGroup = function collapseGroup(group) {
    if (this.widget) {
      this.widget.collapseGroup(group);
    }
  };

  Grid.prototype.collapseRow = function collapseRow(row) {
    if (this.widget) {
      this.widget.collapseRow(row);
    }
  };

  Grid.prototype.current = function current(cell) {
    if (this.widget) {
      return this.widget.current(cell);
    }
  };

  Grid.prototype.dataItem = function dataItem(row) {
    if (this.widget) {
      return this.widget.dataItem(row);
    }
  };

  Grid.prototype.destroy = function destroy() {
    if (this.widget) {
      this.widget.destroy();
    }
  };

  Grid.prototype.editCell = function editCell(cell) {
    if (this.widget) {
      this.widget.editCell(cell);
    }
  };

  Grid.prototype.editRow = function editRow(row) {
    if (this.widget) {
      this.widget.editRow(row);
    }
  };

  Grid.prototype.expandGroup = function expandGroup(row) {
    if (this.widget) {
      this.widget.expandGroup(row);
    }
  };

  Grid.prototype.expandRow = function expandRow(row) {
    if (this.widget) {
      this.widget.expandRow(row);
    }
  };

  Grid.prototype.getOptions = function getOptions() {
    if (this.widget) {
      return this.widget.getOptions();
    }
  };

  Grid.prototype.hideColumn = function hideColumn(column) {
    if (this.widget) {
      this.widget.hideColumn(column);
    }
  };

  Grid.prototype.lockColumn = function lockColumn(column) {
    if (this.widget) {
      this.widget.lockColumn(column);
    }
  };

  Grid.prototype.refresh = function refresh() {
    if (this.widget) {
      this.widget.refresh();
    }
  };

  Grid.prototype.removeRow = function removeRow(row) {
    if (this.widget) {
      this.widget.removeRow(row);
    }
  };

  Grid.prototype.reorderColumn = function reorderColumn(destIndex, column) {
    if (this.widget) {
      this.widget.reorderColumn(destIndex, column);
    }
  };

  Grid.prototype.saveAsExcel = function saveAsExcel() {
    if (this.widget) {
      this.widget.saveAsExcel();
    }
  };

  Grid.prototype.saveAsPDF = function saveAsPDF() {
    if (this.widget) {
      this.widget.saveAsPDF();
    }
  };

  Grid.prototype.saveChanges = function saveChanges() {
    if (this.widget) {
      this.widget.saveChanges();
    }
  };

  Grid.prototype.saveRow = function saveRow() {
    if (this.widget) {
      this.widget.saveRow();
    }
  };

  Grid.prototype.select = function select(rows) {
    if (this.widget) {
      return this.widget.select(rows);
    }
  };

  Grid.prototype.setDataSource = function setDataSource(dataSource) {
    if (this.widget) {
      this.widget.setDataSource(dataSource);
    }
  };

  Grid.prototype.setOptions = function setOptions(options) {
    if (this.widget) {
      this.widget.setOptions(options);
    }
  };

  Grid.prototype.showColumn = function showColumn(column) {
    if (this.widget) {
      this.widget.showColumn(column);
    }
  };

  Grid.prototype.unlockColumn = function unlockColumn(column) {
    if (this.widget) {
      this.widget.unlockColumn(column);
    }
  };

  var _Grid = Grid;
  Grid = _aureliaFramework.inject(Element)(Grid) || Grid;
  Grid = generateBindables('kendoGrid')(Grid) || Grid;
  Grid = _aureliaFramework.customElement('k-grid')(Grid) || Grid;
  return Grid;
})(WidgetBase);

exports.Grid = Grid;

function isInitFromTable(element) {
  return element.children.length > 0 && element.children[0].nodeName === 'TABLE';
}

var AuCol = (function () {
  var _instanceInitializers5 = {};

  _createDecoratedClass(AuCol, [{
    key: 'aggregates',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'attributes',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'columns',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'command',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'editor',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'encoded',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'field',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'filterable',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'footerTemplate',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'format',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return '';
    },
    enumerable: true
  }, {
    key: 'groupable',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'groupFooterTemplate',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'groupHeaderTemplate',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'headerAttributes',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'headerTemplate',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'hidden',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'lockable',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'locked',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'menu',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'minScreenWidth',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'sortable',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'title',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'values',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'width',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }], null, _instanceInitializers5);

  function AuCol(targetInstruction) {
    _classCallCheck(this, _AuCol);

    _defineDecoratedPropertyDescriptor(this, 'aggregates', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'attributes', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'columns', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'command', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'editor', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'encoded', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'field', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'filterable', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'footerTemplate', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'format', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'groupable', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'groupFooterTemplate', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'groupHeaderTemplate', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'headerAttributes', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'headerTemplate', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'hidden', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'lockable', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'locked', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'menu', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'minScreenWidth', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'sortable', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'values', _instanceInitializers5);

    _defineDecoratedPropertyDescriptor(this, 'width', _instanceInitializers5);

    this.template = targetInstruction.elementInstruction.template;
  }

  var _AuCol = AuCol;
  AuCol = _aureliaFramework.inject(_aureliaFramework.TargetInstruction)(AuCol) || AuCol;
  AuCol = _aureliaFramework.processContent(function (compiler, resources, element, instruction) {
    var html = element.innerHTML;
    if (html !== '') {
      instruction.template = html;
    }

    return true;
  })(AuCol) || AuCol;
  AuCol = _aureliaFramework.noView(AuCol) || AuCol;
  return AuCol;
})();

exports.AuCol = AuCol;
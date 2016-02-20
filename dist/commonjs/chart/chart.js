'use strict';

exports.__esModule = true;

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _aureliaFramework = require('aurelia-framework');

var _commonWidgetBase = require('../common/widget-base');

var _commonDecorators = require('../common/decorators');

require('kendo-ui/js/kendo.dataviz.chart.min');

var Chart = (function (_WidgetBase) {
  var _instanceInitializers = {};

  _inherits(Chart, _WidgetBase);

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
  }], null, _instanceInitializers);

  function Chart(element) {
    _classCallCheck(this, _Chart);

    _WidgetBase.call(this, 'kendoChart', element);

    _defineDecoratedPropertyDescriptor(this, 'kDataSource', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);
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
  Chart = _commonDecorators.generateBindables('kendoChart')(Chart) || Chart;
  Chart = _aureliaFramework.customElement('k-chart')(Chart) || Chart;
  return Chart;
})(_commonWidgetBase.WidgetBase);

exports.Chart = Chart;
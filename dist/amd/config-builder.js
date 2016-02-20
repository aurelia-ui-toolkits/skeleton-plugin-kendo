define(['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
});
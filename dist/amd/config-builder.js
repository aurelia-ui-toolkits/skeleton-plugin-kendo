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
      this.kendoAutoComplete().kendoButton().kendoTemplateSupport().kendoTabStrip();
      return this;
    };

    KendoConfigBuilder.prototype.pro = function pro() {
      this.core().kendoGrid().kendoChart();
      return this;
    };

    KendoConfigBuilder.prototype.withoutGlobalResources = function withoutGlobalResources() {
      this.useGlobalResources = false;
      return this;
    };

    KendoConfigBuilder.prototype.useValueConverters = function useValueConverters() {
      this.resources.push('valueconverters/valueconverters');
      return this;
    };

    KendoConfigBuilder.prototype.kendoTemplateSupport = function kendoTemplateSupport() {
      this.resources.push('common/k-template');
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

    KendoConfigBuilder.prototype.kendoTabStrip = function kendoTabStrip() {
      this.resources.push('tabstrip/tabstrip');
      return this;
    };

    return KendoConfigBuilder;
  })();

  exports.KendoConfigBuilder = KendoConfigBuilder;
});
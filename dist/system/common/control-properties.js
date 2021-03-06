System.register(['./bindables'], function (_export) {
  'use strict';

  var bindables, ControlProperties;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_bindables) {
      bindables = _bindables.bindables;
    }],
    execute: function () {
      ControlProperties = (function () {
        function ControlProperties() {
          _classCallCheck(this, ControlProperties);

          this.cache = [];
          this.templateProperties = [];
        }

        ControlProperties.prototype.getProperties = function getProperties(controlName) {
          if (this.cache[controlName]) {
            return this.cache[controlName];
          }

          var options1 = this.getWidgetProperties(controlName);

          var options2 = bindables[controlName];

          if (!options2) {
            throw new Error(controlName + ' not found in generated bindables.js');
          }

          var keys = options1.concat(options2.filter(function (item) {
            return options1.indexOf(item) < 0;
          }));

          this.cache[controlName] = keys;

          return keys;
        };

        ControlProperties.prototype.getWidgetProperties = function getWidgetProperties(controlName) {
          if (jQuery.fn[controlName]) {
            return Object.keys(jQuery.fn[controlName].widget.prototype.options);
          }

          return [];
        };

        ControlProperties.prototype.getTemplateProperties = function getTemplateProperties(controlName) {
          var properties = this.getProperties(controlName);

          var templates = properties.filter(function (prop) {
            return prop.toLowerCase().indexOf('template') >= -1;
          });

          return templates;
        };

        return ControlProperties;
      })();

      _export('ControlProperties', ControlProperties);
    }
  };
});
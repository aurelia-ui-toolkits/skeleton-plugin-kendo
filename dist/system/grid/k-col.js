System.register(['aurelia-templating', '../common/constants', '../common/decorators', '../common/util'], function (_export) {
  'use strict';

  var children, customElement, constants, generateBindables, useTemplates, Col;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaTemplating) {
      children = _aureliaTemplating.children;
      customElement = _aureliaTemplating.customElement;
    }, function (_commonConstants) {
      constants = _commonConstants.constants;
    }, function (_commonDecorators) {
      generateBindables = _commonDecorators.generateBindables;
    }, function (_commonUtil) {
      useTemplates = _commonUtil.useTemplates;
    }],
    execute: function () {
      Col = (function () {
        var _instanceInitializers = {};

        function Col() {
          _classCallCheck(this, _Col);

          _defineDecoratedPropertyDescriptor(this, 'templates', _instanceInitializers);
        }

        Col.prototype.bind = function bind() {
          useTemplates(this, 'GridColumn', this.templates);
        };

        _createDecoratedClass(Col, [{
          key: 'templates',
          decorators: [children(constants.elementPrefix + 'template')],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        var _Col = Col;
        Col = generateBindables('GridColumn')(Col) || Col;
        Col = customElement(constants.elementPrefix + 'col')(Col) || Col;
        return Col;
      })();

      _export('Col', Col);
    }
  };
});
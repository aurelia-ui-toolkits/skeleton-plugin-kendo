System.register(['./constants'], function (_export) {
  'use strict';

  var constants;

  _export('fireEvent', fireEvent);

  _export('fireKendoEvent', fireKendoEvent);

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

  return {
    setters: [function (_constants) {
      constants = _constants.constants;
    }],
    execute: function () {}
  };
});
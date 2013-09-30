!function(document, $, exports) {
  'use strict';

  var Output = exports.Output;

  function read(options, callback) {
    var i, l, option, handler,
        handlers = [],
        clickback = function(choice) {
          detachAll(handlers);
          callback(choice);
        };

    for(i = 0, l = options.length; i < l; i++) {
      option = options[i];
      handler = attach(option, clickback);
      handlers.push({ option: option, handler: handler });
    }
  };

  function attach(option, callback) {
    var handler = function(e) {
      e.preventDefault();
      callback(option);
    };

    Output._$el(option).on('click', handler);
    return handler;
  }

  function detachAll(handlers) {
    handlers.forEach(function(tuple) {
      Output._$el(tuple.option).off('click', tuple.handler);
    });
  }

  exports.Input = { read: read };

}(document, $, Adventure.Framework);

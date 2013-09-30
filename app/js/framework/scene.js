!function(exports) {
  'use strict';

  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  function Scene(data, input, output, eventBus) {
    this._input = input;
    this._output = output;
    this._eventBus = eventBus;

    this._name = data.name;
    this._trigger = data.trigger;
    this._text = data.text;
    this._options = data.options;
    this._end = data.end;
  }


  /*
   * Turn Callbacks
   * ---------------------------------------------------------------------------
   */

  Scene.prototype.start = function(player, location, next) {
    this._output.flush(location, this._text, this._options);
    next();
  };

  Scene.prototype.action = function(player, location, next) {
    this._input.read(this._options, function(choice) {
      this._eventBus.emit(this._name + ':' + choice);
      next();
    });
  };

  Scene.prototype.end = function(player, location, next) {
    next();
  };


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Scene = Scene;

}(Adventure.Framework);

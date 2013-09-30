!function(exports) {
  'use strict';

  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  function Scene(data, input, output) {
    this._input = input;
    this._output = output;

    this._name = data.name;
    this._trigger = data.trigger;
    this._text = data.text;
    this._options = data.options;
    this._end = data.end;
  }


  /*
   * Destructor
   * ---------------------------------------------------------------------------
   */

  Scene.prototype.destroy = function() {
  };


  /*
   * Turn Callbacks
   * ---------------------------------------------------------------------------
   */

  Scene.prototype.setup = function(player, location, done) {
    this._output.flush(location, this._text, this._options);
    done();
  };

  Scene.prototype.action = function(player, location, next, end) {
    this._input.read(this._options, function(choice) {
      if(!this._end) next(choice);
      else end();
    });
  };


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Scene = Scene;

}(Adventure.Framework);

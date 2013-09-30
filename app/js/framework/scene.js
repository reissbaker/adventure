!function(exports) {
  'use strict';

  var flush = exports.Output.flush;

  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  function Scene(data) {
    this._data = data;
    this._location = null;
  }


  /*
   * Turn Callbacks
   * ---------------------------------------------------------------------------
   */

  Scene.prototype.start = function(player, next) {
    flush(this._location, this._data.start, {});
    next();
  };

  Scene.prototype.action = function(player, next) {
  };

  Scene.prototype.end = function(player, next) {
    next();
  };


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Scene = Scene;

}(Adventure.Framework);

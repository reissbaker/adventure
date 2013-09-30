!function(exports) {
  'use strict';

  var flush = exports.Output.flush;

  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  function Scene(data) {
    this._data = data;
  }


  /*
   * Turn Callbacks
   * ---------------------------------------------------------------------------
   */

  Scene.prototype.start = function(player, location, next) {
    flush(location, this._data.start, {});
    next();
  };

  Scene.prototype.action = function(player, location, next) {
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

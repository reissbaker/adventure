!function(exports) {
  'use strict';

  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  function Scene(name, data) {
    this._name = name;

    this._text = data.text;
    this._options = data.options || {};
    this._end = !data.options;

    this.attributes = data.attributes;
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

  Scene.prototype.setup = function(io, player, location, done) {
    var text = this._text();
    io.output(location, text, Object.keys(this._options));
    done();
  };

  Scene.prototype.action = function(io, player, location, next, end) {
    var that = this;

    if(this._end) {
      end();
      return;
    }

    io.input(Object.keys(this._options), function(choice) {
      that._options[choice].call(that);
      next(choice);
    });
  };


  /*
   * Class Methods
   * ---------------------------------------------------------------------------
   */

  var scenes = [];
  Scene.define = function(name, options) {
    var scene = new Scene(name, options);
    scenes.push(scene);
    return scene;
  };


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Scene = Scene;

}(Adventure.Framework);

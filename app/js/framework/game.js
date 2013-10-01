!function(exports) {
  'use strict';

  /*
   * Dependencies
   * ---------------------------------------------------------------------------
   */

  var Input = exports.Input,
      Output = exports.Output,
      Turn = exports.Turn;


  /*
   * State
   * ---------------------------------------------------------------------------
   */

  var importantScenes = [],
      locationScenes = [],
      scenes = [];

  var player = null,
      scene = null,
      location = null,
      data = null,
      io = {
        output: function(l, b, c) { Output.flush(l, b, c); },
        input: function(c, callback) { Input.read(c, callback); }
      };


  /*
   * Game Loop
   * ---------------------------------------------------------------------------
   */

  function start() {
    run();
  }

  function run() {
    scene = pickScene();
    console.log(scene);
    Turn.run(io, player, location, scene, next, end);
  }

  function next(choice) {
    run();
  }

  function end() {
    var remaining = importantScenes.concat(locationScenes).concat(scenes);
    remaining.forEach(function(scene) { scene.destroy(); });
  }


  /*
   * Helpers
   * ---------------------------------------------------------------------------
   */

  function changeLocation(name) {
    locationScenes = [];
    location = data.location[name];
  }

  function pickScene() {
    var index, queue,
        order = [ importantScenes, locationScenes, scenes ],
        s = null;

    for(index = 0; !s && (queue = order[index]); index++) {
      s = queue.shift();
    }

    return s;
  }


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Game = {
    start: start,
    Scenes: {
      important: importantScenes,
      locationScenes: locationScenes,
      basic: scenes
    },
    Location: {
      set: function(l) { location = l; },
      get: function() { return location; }
    }
  };

}(Adventure.Framework);

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
      data = null;


  /*
   * Game Loop
   * ---------------------------------------------------------------------------
   */

  function start(gameData) {
    data = gameData;
    importantScenes.push(gameData.start);
  }

  function run() {
    scene = pickScene();
    Turn.run(player, location, scene, next, end);
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

    for(index = 0; !s && queue = order[index]; index++) {
      s = queue.shift();
    }

    return s;
  }


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Game = { start: start };

}(Adventure.Framework);

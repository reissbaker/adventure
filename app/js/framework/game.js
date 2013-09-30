!function(exports) {
  'use strict';

  var Input = exports.Input,
      Output = exports.Output,
      turn = exports.turn;

  var importantScenes = [],
      locationScenes = [],
      scenes = [];

  var player = null,
      location = null,
      data = null;

  function start(gameData) {
    data = gameData;
    importantScenes.push(gameData.start);
  }

  function run() {
    turn(player, location, scene(), run, end);
  }

  function end() {
    var remaining = importantScenes.concat(locationScenes).concat(scenes);
    remaining.forEach(function(scene) { scene.destroy(); });
  }

  function changeLocation(name) {
    locationScenes = [];
    location = data.location[name];
  }

  function scene() {
    var index, queue,
        order = [ importantScenes, locationScenes, scenes ],
        s = null;

    for(index = 0; !s && queue = order[index]; index++) {
      s = queue.shift();
    }

    return s;
  }

}(Adventure.Framework);

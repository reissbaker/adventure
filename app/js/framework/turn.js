!function(exports) {
  'use strict';

  /*
   * Turn
   * ---------------------------------------------------------------------------
   */

  function turn(player, location, scene, next, end) {
    scene.start(player, location, function() {
      scene.action(player, location, function() {
        scene.end(player, location, next, end);
      });
    });
  }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.turn = turn;

}(Adventure.Framework);

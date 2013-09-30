!function(exports) {
  'use strict';

  /*
   * Turn
   * ---------------------------------------------------------------------------
   */

  function turn(player, location, scene, next) {
    scene.start(player, location, function() {
      scene.action(player, location, function() {
        scene.end(player, location, next);
      });
    });
  }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.turn = turn;

}(Adventure.Framework);

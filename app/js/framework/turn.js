!function(exports) {
  'use strict';

  /*
   * Turn
   * ---------------------------------------------------------------------------
   */

  function turn(player, scene, next) {
    scene.start(player, function() {
      scene.action(player, function() {
        scene.end(player, next);
      });
    });
  }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.turn = turn;

}(Adventure.Framework);

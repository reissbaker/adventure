!function(exports) {
  'use strict';

  /*
   * Run Turn
   * ---------------------------------------------------------------------------
   */

  function run(player, location, scene, next, end) {
    scene.setup(player, location, function() {
      scene.action(player, location, next, end);
    });
  }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.Turn = { run: run };

}(Adventure.Framework);

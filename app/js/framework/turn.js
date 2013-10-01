!function(exports) {
  'use strict';

  /*
   * Run Turn
   * ---------------------------------------------------------------------------
   */

  function run(io, player, location, scene, next, end) {
    scene.setup(io, player, location, function() {
      scene.action(io, player, location, next, end);
    });
  }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.Turn = { run: run };

}(Adventure.Framework);

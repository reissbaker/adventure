!function(exports) {
  'use strict';

  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  function Location(name) {
    this._name = name;
    this._occupants = [];
  }


  /*
   * Getters
   * ---------------------------------------------------------------------------
   */

  Location.prototype.name = function() {
    return this._name;
  };

  Location.prototype.occupants = function() {
    return this._occupants.splice();
  };


  /*
   * Occupancy
   * ---------------------------------------------------------------------------
   */

  Location.prototype.enter = function(occupant) {
    this._occupants.push(occupant);
  };

  Location.prototype.exit = function(occupant) {
    var index = this._occupants.indexOf(occupant);
    if(index < 0) return null;

    this._occupants.splice(index, 1);
    return occupant;
  };


  /*
   * Exports
   * ---------------------------------------------------------------------------
   */

  exports.Location = Location;

}(Adventure.Framework);

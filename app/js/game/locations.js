!function(Framework, exports) {
  'use strict';

  var Location = Framework.Location;

  Location.define('SOMA', {});
  Location.define('20 Rausch', { south: 'Folsom' });
  Location.define('Folsom', {
    north: '20 Rausch',
    south: 'Harrison'
  });
  Location.define('Harrison', {
    north: 'Folsom',
    south: 'Brannan'
  });
  Location.define('Brannan', { north: 'Harrison' });

}(Adventure.Framework, Adventure.Game);

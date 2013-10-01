!function(Framework, exports) {
  'use strict';

  var Scene = Framework.Scene,
      Location = Framework.Location,
      Game = Framework.Game;

  var score = 5,
      index = 0,
      called = false,
      scenes = [],
      locations = [];

  function decrement() {
    score--;
    next();
  }

  function noop() {
    next();
  }

  function next() {
    index++;
    update();
  }

  function restart() {
    index = 0;
    update();
  }

  function update() {
    Game.Scenes.important.push(scenes[index]);
    Game.Location.set(locations[index]);
  }

  function scene(name, options) {
    scenes.push(Scene.define(name, options));
  }

  function location(name, neighbors) {
    locations.push(Location.define(name, neighbors));
  }

  function template(name, data) {
    var prop, regex,
        text = $('#ab-' + name).text();
    if(data) {
      for(prop in data) {
        if(data.hasOwnProperty(prop)) {
          regex = '{{\\s*' + prop + '\\s*}}';
          text = text.replace(new RegExp(regex), data[prop]);
        }
      }
    }
    return text;
  }

  scene('intro', {
    text: function() {
      return template('intro');
    },
    options: {
      'drive east': noop
    }
  });

  location('SOMA', {
  });

  scene('arrival', {
    text: function() {
      return template('arrival');
    },
    options: {
      'open car door': noop,
      'sit inside': decrement
    }
  });

  location('20 Rausch', {
    south: 'Folsom'
  });

  scene('call', {
    text: function() { return template('call') },
    options: {
      'call passenger': function() {
        score--;
        index += 2;
        called = true;
        update();
      },
      'wait': noop
    }
  });

  location('20 Rausch', {
    south: 'Folsom'
  });

  scene('call2', {
    text: function() { return template('call2') },
    options: {
      'call passenger': function() {
        called = true;
        decrement();
      },
      'wait': function() {
        index += 2;
        update();
      }
    }
  });

  location('20 Rausch', {
    south: 'Folsom'
  });

  scene('phone', {
    text: function() { return template('phone'); },
    options: {
      'wait': noop
    }
  })

  location('20 Rausch', {
    south: 'Folsom'
  });

  scene('appearance', {
    text: function() {
      return template('appearance', {
        statement: called ? 'Sorry to keep you waiting' : 'Hey'
      });
    },
    options: {
      'drive south': noop
    }
  });

  location('Folsom', {
    north: '20 Rausch',
    south: 'Harrison'
  });

  scene('talking', {
    text: function() {
      return template('talking');
    },
    options: {
      'meet his gaze': noop,
      'avoid his gaze': decrement
    }
  });

  location('Harrison', {
    north: 'Folsom',
    south: 'Brannan'
  });

  scene('destination', {
    text: function() {
      return template('destination');
    },
    options: {
      'pull away from the curb': noop,
    }
  });

  location('Harrison', {
    north: 'Folsom',
    south: 'Brannan'
  });

  scene('end', {
    text: function() {
      return template('end', { score: score });
    },
    options: {
      'replay ↩': restart
    }
  });

  location('SOMA', {
  });

  update();
  Game.start();

}(Adventure.Framework, Adventure.Game);

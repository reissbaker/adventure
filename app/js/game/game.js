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
    next(Location.get(this.attributes.location));
  }

  function noop() {
    next(Location.get(this.attributes.location));
  }

  function next(location) {
    index++;
    update(location);
  }

  function restart(location) {
    index = 0;
    update(Location.get(this.attributes.location));
  }

  function update(location) {
    Game.Scenes.important.push(scenes[index]);
    Game.Location.set(location);
  }

  function scene(name, options) {
    scenes.push(Scene.define(name, options));
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
    text: function() { return template('intro'); },
    attributes: { location: 'SOMA' },
    options: {
      'drive east': noop
    }
  });

  scene('arrival', {
    text: function() { return template('arrival'); },
    attributes: { location: '20 Rausch' },
    options: {
      'open car door': noop,
      'sit inside': decrement
    }
  });

  scene('call', {
    text: function() { return template('call') },
    attributes: { location: '20 Rausch' },
    options: {
      'call passenger': function() {
        score--;
        index += 2;
        called = true;
        update(Location.get(this.attributes.location));
      },
      'wait': noop
    }
  });

  scene('call2', {
    text: function() { return template('call2') },
    attributes: { location: '20 Rausch' },
    options: {
      'call passenger': function() {
        called = true;
        decrement();
      },
      'wait': function() {
        index += 2;
        update(Location.get(this.attributes.location));
      }
    }
  });

  scene('phone', {
    text: function() { return template('phone'); },
    attributes: { location: '20 Rausch' },
    options: {
      'wait': noop
    }
  })

  scene('appearance', {
    text: function() {
      return template('appearance', {
        statement: called ? 'Sorry to keep you waiting' : 'Hey'
      });
    },
    attributes: { location: 'Folsom' },
    options: {
      'drive south': noop
    }
  });

  scene('talking', {
    text: function() { return template('talking'); },
    attributes: { location: 'Harrison' },
    options: {
      'meet his gaze': noop,
      'avoid his gaze': decrement
    }
  });

  scene('destination', {
    text: function() { return template('destination'); },
    attributes: { location: 'Brannan' },
    options: {
      'pull away from the curb': noop,
    }
  });

  scene('end', {
    text: function() { return template('end', { score: score }); },
    attributes: { location: 'SOMA' },
    options: {
      'replay ↩': restart
    }
  });

  update(Location.get(scenes[0].attributes.location));
  Game.start();

}(Adventure.Framework, Adventure.Game);

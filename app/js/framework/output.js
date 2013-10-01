!function($, exports) {
  'use strict';

  /*
   * Flush
   * ---------------------------------------------------------------------------
   */

  function flush(location, body, options) {
    var $el = $('.content'),
        lFormatted = formatLocation(location),
        bFormatted = formatBody(body),
        oFormatted = formatOptions(options);

    $el.html(render(lFormatted, bFormatted, oFormatted));
  }


  /*
   * Format
   * ---------------------------------------------------------------------------
   */

  function formatLocation(location) {
    var $container = container().addClass('adventure-location-container'),
        $el = container().text(location.name()).addClass('adventure-location');
    return $container.append($el).addClass('adventure-content');
  }

  function formatBody(body) {
    return container()
    .text(body)
    .addClass('adventure-body').addClass('adventure-content');
  }

  function formatOptions(options) {
    var option, i, l,
        $el = container().addClass('adventure-choices')
              .addClass('adventure-content');
    for(i = 0, l = options.length; i < l; i++) {
      option = options[i];
      $el.append(
        link()
        .text(option)
        .attr('id', id(option))
        .addClass('adventure-choice')
      );
    }
    return $el;
  }

  function id(option) {
    return 'adventure-' + option.replace(/\s/g, '-');
  }


  /*
   * Render
   * ---------------------------------------------------------------------------
   */

  function render(lFormatted, bFormatted, oFormatted) {
    return container()
    .append(lFormatted, bFormatted, oFormatted)
    .addClass('adventure-game');
  }

  function container() { return $('<div>'); }
  function link() { return $('<a href=#>'); }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.Output = {
    flush: flush,
    _$el: function(option) { return $('#' + id(option)); }
  };

}($, Adventure.Framework);

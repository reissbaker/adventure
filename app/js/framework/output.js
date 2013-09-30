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
    return location.name();
  }

  function formatBody(body) {
    return body;
  }

  function formatOptions(options) {
    return 'Hello';
  }

  function id(option) {
    return 'adventure-' + option.replace(/\s/g, '-');
  }


  /*
   * Render
   * ---------------------------------------------------------------------------
   */

  function render(lFormatted, bFormatted, oFormatted) {
    var $l = container(),
        $b = container(),
        $o = container();

    $l.text(lFormatted);
    $b.text(bFormatted);
    $o.text(oFormatted);
  }

  function container() { return $('<div>'); }


  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.Output = {
    flush: flush,
    _$el: function(option) { return $(id(option)); }
  };

}($, Adventure.Framework);

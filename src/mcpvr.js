/*
 * MCPVR
 * https://github.com/ValeriaVG/MCPVR
 *
 * Copyright (c) 2016 ValeriaVG
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.MCPVR = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.MCPVR = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.MCPVR.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.MCPVR.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].MCPVR = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));

'use strict';

/* global global */

// global is iMacros Sandbox object that is supposed to be set in banner like this:
// var global = this;

var Ci = Components['interfaces'];
var Cc = Components['classes'];

global['timer'] = Cc['@mozilla.org/timer;1']
  ['createInstance'](Ci['nsITimer']);

var chrome = window['QueryInterface'](Ci['nsIInterfaceRequestor'])
  ['getInterface'](Ci['nsIWebNavigation'])
  ['QueryInterface'](Ci['nsIDocShellTreeItem'])['rootTreeItem']
  ['QueryInterface'](Ci['nsIInterfaceRequestor'])
  ['getInterface'](Ci['nsIDOMWindow']);

// Add onclick handler to the stop button on iMacros' main panel
chrome['iMacros']['panel']['sidebar']['document']
  ['getElementById']('im-stopplay-button')['onclick'] = function() {
    global['timer']['cancel']();
};

// Add onclick handler to the stop button on iMacros' minified panel
chrome['document']['getElementById']('imacros-info-panel-stop-button')['onclick'] = function() {
  global['timer']['cancel']();
};

module.exports = function pause(seconds) {
  seconds--;
  var display = seconds;
  iimDisplay('Waiting ' + display + ' sec.');

  var delay = {
    observe: function() {
      seconds--;
      iimDisplay('Waiting ' + (--display) + ' sec.');
      if (seconds <= 0) {
        global['timer']['cancel']();
        iimDisplay('');
        iimPlayCode('');
      }
    }
  };

  global['timer']['init'](delay, 1000, Ci['nsITimer']['TYPE_REPEATING_PRECISE_CAN_SKIP']);
  iimPlayCode('pause');
};

'use strict';

var myWindow = Components.classes['@mozilla.org/appshell/appShellService;1']
  .getService(Components.interfaces.nsIAppShellService)
  .hiddenDOMWindow;

function pause(seconds) {
  iimDisplay('Waiting ' + seconds + 'sec.');

  var PA = myWindow.setInterval(function() {
    iimDisplay('Waiting ' + (--seconds) + 'sec.');
  }, 1000);

  myWindow.setTimeout(
    function() {
      myWindow.clearInterval(PA);
      iimDisplay('');
      iimPlayCode('');
    }, (seconds * 1000));
    iimPlayCode('PAUSE');
}

module.exports = pause;

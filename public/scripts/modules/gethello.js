define([], function() {
  var the_greeting;
  var debug;
  var setDebug = function (mode) {
    if (mode === true ) {
      debug = true;
    } else {
      debug = false;
    }
  }
  var setGreeting = function(msg) {
    the_greeting = "\"Hi " + msg + "\"";
    if (debug) {
      alert('Set the greeting to ' + the_greeting);
    }
  };
  var getGreeting = function ( data ) {
    return the_greeting;
  };
  var printGreeting = function () {
    if (the_greeting) {
      alert(the_greeting);
    }
  };
  return {
    setdebug: setDebug,
    setmsg: setGreeting,
    getmsg: getGreeting,
    greet: printGreeting
  };
});

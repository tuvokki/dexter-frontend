require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.10.2.min",
    // "domReady": "lib/domReady",
    // "underscore": "lib/underscore",
    "text": "lib/text",
    "Ractive": "lib/Ractive",
    "rv": "lib/rv",
    "json": "lib/json"
  }
});

require([ 'Ractive', 'rv!templates/main', 'rv!templates/navlist', 'json!/hapi/hello' , 'json!/hapi/navlist', 'jquery' ],
  function ( Ractive, mainTmpl, navListTmpl, hapihello, hapinavlist, $ ) {

  // create the hello world greeting based on the hapi hello backend
  /*
  hapihello Object {
    greeting: "Hello"
    recipient: "world"
    }
  */
  var greet = new Ractive({
    el: 'container',
    template: mainTmpl,
    data: hapihello
  });
  // attach a listener to the Say! button
  listener = greet.on({
    getgreet: function () {
      $.getJSON( "/hapi/hello").done(function( data ) {
        greet.set({
          greeting: data.greeting,
          recipient: data.recipient
        });
      });
    }
  });

  // use the json object retrieved from the hapi to show a list of links in the navigation
  var navlist = new Ractive({
    el: 'target',
    template: navListTmpl,
    data: {
      navItems: hapinavlist
    }
  });
});

define([], function() {
	var debug;
	var setDebug = function (mode) {
		if (mode === true ) {
			debug = true;
		} else {
			debug = false;
		}
	}


	return {
		setdebug: setDebug,
	};
});


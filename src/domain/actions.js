'use strict';


var store = require('./store');


function logActionCall(fnName, fn) {
	var args = [].slice.call(arguments, 2);
	console.log(fnName, args);
	fn.apply(null, args);
}


function updateCurrentRoutePath(routePath) {
	store.currentRoutePath = routePath;
}


module.exports = {
	updateCurrentRoutePath: logActionCall.bind(null, 'updateCurrentRoutePath', updateCurrentRoutePath),
};

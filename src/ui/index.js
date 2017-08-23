'use strict';


var m = require('mithril');


var actions = require('./../domain/actions');
var layouts = require('./layouts');
var screens = require('./screens');


function doLayout(layout, screen) {
	return {
		render: function () {
			return m(layout, m(screen));
		},
	};
}


function setupRoutes() {
	m.route.prefix('#!');
	m.route(document.body, '/', {
		'/': doLayout(layouts.default, screens.home),
	});
}


function onRouteChange() {
	actions.updateCurrentRoutePath(window.location.hash, 'some other thing');
}


function init() {
	setupRoutes();

	window.addEventListener('hashchange', onRouteChange, false);
	onRouteChange(null);
}

init();

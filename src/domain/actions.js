'use strict';


var m = require('mithril');


var store = require('./store');


function logActionCall(fnName, fn) {
	var args = [].slice.call(arguments, 2);
	console.log(fnName, args);
	fn.apply(null, args);
}


function updateCurrentRoutePath(routePath) {
	store.currentRoutePath = routePath;
}


function toggleSearchIsAddFilterShowing() {
	store.Search.isAddFilterShowing = !store.Search.isAddFilterShowing;
}


function updateSearchResults(list) {
	store.Search.results = list;
}


function fetchSystemsData() {
	store.Data.isLoading = true;
	m.redraw();

	m.request({
		method: 'GET',
		url: './data/systems.json',
	})
		.then(function (result) {
			store.Data.isLoading = false;
			store.Data.content = result;
		});
}


module.exports = {
	updateCurrentRoutePath: logActionCall.bind(null, 'updateCurrentRoutePath', updateCurrentRoutePath),
	toggleSearchIsAddFilterShowing: logActionCall.bind(null, 'toggleSearchIsAddFilterShowing', toggleSearchIsAddFilterShowing),
	updateSearchResults: logActionCall.bind(null, 'updateSearchResults', updateSearchResults),
	fetchSystemsData: logActionCall.bind(null, 'fetchSystemsData', fetchSystemsData),
};

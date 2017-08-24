'use strict';


var m = require('mithril');


var store = require('./store');


function logActionCall(fnName, fn) {
	var args = [].slice.call(arguments, 2);
	console.log('%cdomain.actions() -> ' + fnName, 'background: #222; color: #bada55; padding: 4px 10px;', args);
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
		url: './data/systems.xml',
		deserialize: function (value) {
			return (new window.DOMParser()).parseFromString(value, 'text/xml');
		},
	})
		.then(function (result) {
			console.log(result);
			store.Data.isLoading = false;
			store.Data.content = result;
			updateSearchResults(result);
		});
}


module.exports = {
	updateCurrentRoutePath: logActionCall.bind(null, 'updateCurrentRoutePath', updateCurrentRoutePath),
	toggleSearchIsAddFilterShowing: logActionCall.bind(null, 'toggleSearchIsAddFilterShowing', toggleSearchIsAddFilterShowing),
	updateSearchResults: logActionCall.bind(null, 'updateSearchResults', updateSearchResults),
	fetchSystemsData: logActionCall.bind(null, 'fetchSystemsData', fetchSystemsData),
};

'use strict';


var m = require('mithril');



function view(vnode) {
	var contentView = m('div', 'Loading...');

	if (!vnode.attrs.isLoading && vnode.attrs.data) {
		contentView = m('pre', JSON.stringify(vnode.attrs.data.systems.system.length));
	}

	return m('div.SearchResults', [
		m('h2', 'Search Results'),
		contentView,
		// vnode.attrs.data.map(function (planet) {
		// 	return m('div.SearchResults__Planet', JSON.stringify(planet));
		// })
	]);
}


module.exports = {
	view: view,
};

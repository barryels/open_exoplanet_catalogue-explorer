'use strict';


var m = require('mithril');



function view(vnode) {
	var contentView = m('div', 'Loading...');

	if (!vnode.attrs.isLoading && vnode.attrs.data) {
		// console.log(vnode.attrs.data);
		if (vnode.attrs.data.map) {
			contentView = vnode.attrs.data.map(function (item) {
				return m('div',
					m('pre', item.getElementsByTagName('name')[0].textContent)
				);
			});
		} else {
			contentView = null;
		}
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

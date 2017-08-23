'use strict';


var m = require('mithril');


var attrTypes = {
	filters: {
		range: {
			id: 'RANGE',
		},
	},
};


function onChange(vnode, filter, value) {
	console.log('onChange()', vnode, filter, value);
	filter.onChange(value);
}


function oninit(vnode) {
	var filters = vnode.attrs.filters || [];

	filters.forEach(function (filter) {
		onChange(vnode, filter, 'some value');
	}, this);
}


function view(vnode) {
	return m('div.Search', [
		m('h2', 'FilterGroup'),
		m('pre', JSON.stringify(vnode.attrs, '', 2)),
	]);
}


module.exports = {
	attrTypes: attrTypes,
	oninit: oninit,
	view: view,
};

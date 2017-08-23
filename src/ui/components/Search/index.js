'use strict';


var m = require('mithril');


// var store = require('./../../../domain/store');
var FilterGroup = require('./../FilterGroup');


function onFilterChange(vnode, id, value) {
	console.log('onFilterChange()', vnode, id, value);
}


function buildFilter(vnode, id, type) {
	return {
		id: id, label: 'Age of Planet',
		type: type,
		onChange: onFilterChange.bind(null, vnode, id),
	};
}


function view(vnode) {
	return m('div.Search', [
		m(FilterGroup, {
			filters: [
				buildFilter(vnode, 'planet_age', FilterGroup.attrTypes.filters.range),
			],
		}),
	]);
}


module.exports = {
	view: view,
};

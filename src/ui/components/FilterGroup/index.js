'use strict';


var m = require('mithril');


var attrs = {
	filterTypes: {
		RANGE: {},
		MULTI_RANGE: {},
		SELECT: {},
		MULTI_SELECT: {},
	},
	filterOptions: {
		id: '',
		label: '',
		type: '',
		allowedOccurrences: '',
		value: [],
	},
};


function init() {
	Object.keys(attrs.filterTypes).forEach(function (filterKey) {
		attrs.filterTypes[filterKey].id = filterKey;
	});
}


function onFilterValueChange(vnode, filter, value) {
	console.log('FilterGroup()', vnode, filter, value);
	filter.onChange(value);
}


function getAddFilterTriggerView(vnode) {
	var children = '+';

	if (vnode.attrs.isAddFilterShowing) {
		children = '-';
	}

	return m('button.addFilterTrigger', { onclick: vnode.attrs.onClickAddFilterTrigger.bind(null, vnode), }, children);
}


function getAddFilterView(vnode) {
	var className = '.addFilter',
		classNameModifier = '';

	if (vnode.attrs.isAddFilterShowing) {
		classNameModifier = className + '--is-showing';
	}

	className += classNameModifier;

	return m('div' + className, 'Add a filter');
}


function getFilterTypeView(vnode, filter) {
	console.log(vnode, filter);
	return m('div', [
		m('label', {}, filter.label),
		m('select', {}, [
			m('option', {}, 'Label: ' + filter.id),
		]),
	]);
}


function getSuppliedAvailableFilters(vnode) {
	return vnode.attrs.availableFilters || [];
}


function getActiveFilters(vnode) {
	return vnode.state.activeFilters || [];
}


function oninit(vnode) {
	var availableFilters = getSuppliedAvailableFilters(vnode);

	availableFilters.forEach(function (availableFilter) {
		onFilterValueChange(vnode, availableFilter, 'some value');
	}, this);

	vnode.state = {
		activeFilters: [],
	};

	// Testing
	vnode.state.activeFilters.push(availableFilters[0]);
}


function view(vnode) {

	return m('div.Search', [
		m('pre', JSON.stringify(vnode.attrs, '', 2)),

		getActiveFilters(vnode).map(function (filter) {
			return getFilterTypeView(vnode, filter);
		}),

		getAddFilterTriggerView(vnode),

		getAddFilterView(vnode),
	]);
}


init();


module.exports = {
	attrs: attrs,
	oninit: oninit,
	view: view,
};

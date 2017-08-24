'use strict';


var m = require('mithril');


var attrs = {
	filterTypes: {
		PLAIN_TEXT: {},
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
	// console.log('FilterGroup()', vnode, filter, value);
	filter.onChange(value);
}


function getAddFilterTriggerView(vnode) {
	var children = '+',
		className = '.FilterGroup__AddFilterTrigger';

	if (vnode.attrs.isAddFilterShowing) {
		children = '-';
	}

	return m('div' + className, { onclick: vnode.attrs.onClickAddFilterTrigger.bind(null, vnode), }, children);
}


function getAddFilterView(vnode) {
	var className = '.FilterGroup__AddFilterMenu',
		classNameModifier = '';

	if (vnode.attrs.isAddFilterShowing) {
		classNameModifier = className + '--is-showing';
	}

	className += classNameModifier;

	return m('div' + className, 'Add a filter');
}


function getFilterTypeView(vnode, filter) {
	var className = '.FilterGroup__Filter',
		view = null;
	console.warn(filter.type);

	switch (filter.type) {
		case attrs.filterTypes.PLAIN_TEXT:
			view = m('div' + className, [
				m('label', {}, filter.label),
				m('input', {
					type: 'text',
					oninput: m.withAttr('value', function (v) {
						vnode.attrs.onFilterValueChange(filter, v);
					}),
				}),
			]);
			break;
		default:
			view = m('div' + className, [
				m('label', {}, filter.label),
				m('select', {}, [
					m('option', {}, 'Label: ' + filter.id),
				]),
			]);
	}


	return view;
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
		activeFilters: vnode.attrs.activeFilters || [],
	};

	// Testing
	// vnode.state.activeFilters.push(availableFilters[0]);
}


function view(vnode) {

	return m('div.Search', [
		getActiveFilters(vnode).map(function (filter) {
			return getFilterTypeView(vnode, filter);
		}),

		getAddFilterTriggerView(vnode),

		getAddFilterView(vnode),

		// m('pre', JSON.stringify(vnode.attrs, '', 2)),
	]);
}


init();


module.exports = {
	attrs: attrs,
	oninit: oninit,
	view: view,
};

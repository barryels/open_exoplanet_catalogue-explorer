'use strict';


var m = require('mithril');


var actions = require('./../../../domain/actions');
var store = require('./../../../domain/store');
var FilterGroup = require('./../FilterGroup');


function onFilterChange(vnode, id, value) {
	console.log('onFilterChange()', vnode, id, value);
}


function onClickAddFilterTrigger() {
	actions.toggleSearchIsAddFilterShowing();
}


function buildFilter(vnode, options) {
	if (!options.id || !options.type) {
		return null;
	}

	return {
		id: options.id,
		label: options.label || 'Label...',
		type: options.type,
		allowedOccurrences: options.allowedOccurrences || 1,
		onChange: onFilterChange.bind(null, vnode, options.id),
	};
}


function getElementsByXPath(doc, xpath, parent) {
	var results = [],
		query = doc.evaluate(xpath, parent || doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
		i = 0;

	for (i = 0, length = query.snapshotLength; i < length; ++i) {
		results.push(query.snapshotItem(i));
	}

	return results;
}


function onActiveFiltersChange(vnode, filters, filtersBefore) {
	console.log('onActiveFiltersChange()', filters, filtersBefore);
}


function onFilterValueChange(vnode, filter, value) {
	// console.log('onFilterValueChange()', filter.id, value);
	var result = getElementsByXPath(store.Data.content, '//planet[./name[contains(., "' + value + '")]]');

	actions.updateSearchResults(result);
}


function view(vnode) {
	return m('div.Search', [
		m(FilterGroup, {
			onClickAddFilterTrigger: onClickAddFilterTrigger.bind(null),
			isAddFilterShowing: store.Search.isAddFilterShowing,
			onFilterValueChange: onFilterValueChange.bind(null, vnode),
			onActiveFiltersChange: onActiveFiltersChange.bind(null, vnode),
			activeFilters: [
				buildFilter(vnode, { id: 'planet_name', label: 'Planet Name', type: FilterGroup.attrs.filterTypes.PLAIN_TEXT, }),
			],
			availableFilters: [
				buildFilter(vnode, { id: 'planet_age', label: 'Planet Age (in Gyr)', type: FilterGroup.attrs.filterTypes.RANGE, }),
				buildFilter(vnode, { id: 'planet_size', label: 'Planet Size', type: FilterGroup.attrs.filterTypes.RANGE, }),
				buildFilter(vnode, { id: 'planet_mass', label: 'Planet Mass', type: FilterGroup.attrs.filterTypes.RANGE, }),
				buildFilter(vnode, { id: 'planet_discovery_year', label: 'Planet Mass', type: FilterGroup.attrs.filterTypes.RANGE, }),
				buildFilter(vnode, {
					id: 'planet_discovery_method', label: 'Discovery Method', type: FilterGroup.attrs.filterTypes.MULTI_SELECT, allowedOccurrences: -1,
					options: [
						{ label: 'Timing', value: 'timing', },
						{ label: 'RV', value: 'rv', },
						{ label: 'Transit', value: 'transit', },
						{ label: 'Imaging', value: 'imaging', },
					],
				}),
			],
		}),
	]);
}


module.exports = {
	view: view,
};

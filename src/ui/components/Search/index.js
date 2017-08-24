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


function view(vnode) {
	return m('div.Search', [
		m(FilterGroup, {
			onClickAddFilterTrigger: onClickAddFilterTrigger.bind(null),
			isAddFilterShowing: store.Search.isAddFilterShowing,
			onFilterValueChange: null,
			onActiveFiltersChange: null,
			availableFilters: [
				buildFilter(vnode, { id: 'planet_age', label: 'Planet Age (in Gyr)', type: FilterGroup.attrs.filterTypes.RANGE, }),
				buildFilter(vnode, { id: 'planet_size', label: 'Planet Size', type: FilterGroup.attrs.filterTypes.RANGE, }),
				buildFilter(vnode, {
					id: 'discovery_method', label: 'Discovery Method', type: FilterGroup.attrs.filterTypes.MULTI_SELECT, allowedOccurrences: -1,
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

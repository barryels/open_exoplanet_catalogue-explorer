'use strict';


var store = {
	currentRoutePath: '/',
	Search: {
		isAddFilterShowing: false,
		results: [],
	},
	Data: {
		isLoading: false,
		content: null,
	},
};


module.exports = store;

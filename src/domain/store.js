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
		planets: planets,
	},
};

function getElementsByXPath(doc, xpath, parent) {
	var results = [],
		query = doc.evaluate(xpath, parent || doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
		i = 0;

	for (i = 0, length = query.snapshotLength; i < length; ++i) {
		results.push(query.snapshotItem(i));
	}

	return results;
}

function planets() {
	if (!store.Data.content) {
		return [];
	}

	// return utils.jsonPath(store.Data.content, '$..planet');
	return getElementsByXPath(store.Data.content, '//planet');
	// return store.Data.content.evaluate('//planet', store.Data.content, null, XPathResult.ANY_TYPE, null).iterateNext();
	// return store.Data.content.evaluate('.//planet', store.Data.content, null, XPathResult.ANY_TYPE, null);
}


module.exports = store;

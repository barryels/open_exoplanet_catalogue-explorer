'use strict';


var m = require('mithril');


var store = require('./../../domain/store');
var Search = require('./../components/Search');
var SearchResults = require('./../components/SearchResults');


var home = {
	view: function () {
		return m('div.screen', [
			m('h1', 'screenHome'),
			m(Search),
			m(SearchResults, {
				isLoading: store.Data.isLoading,
				data: store.Data.content,
			}),
		]);
	},
};


module.exports = {
	home: home,
};

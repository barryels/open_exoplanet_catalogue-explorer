'use strict';


var m = require('mithril');


var home = {
	view: function () {
		return m('div.screen', [
			m('h1', 'screenHome'),
		]);
	},
};


module.exports = {
	home: home,
};

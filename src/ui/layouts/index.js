'use strict';


var m = require('mithril');


var Search = require('./../components/Search');


var _default = {
	view: function () {
		return m('div.layoutDefault', [
			m(Search),
		]);
	},
};


module.exports = {
	default: _default,
};

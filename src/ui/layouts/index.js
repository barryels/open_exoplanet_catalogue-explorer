'use strict';


var m = require('mithril');


var _default = {
	view: function (vnode) {
		return m('div.layoutDefault', [
			vnode.children,
		]);
	},
};


module.exports = {
	default: _default,
};

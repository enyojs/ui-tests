var i18n = require('enyo/i18n'),
	ready = require('enyo/ready');

var locale = window.location.hash.replace(/^#/, '');

if(locale) {
	i18n.updateLocale(locale);
}

module.exports = function(testKind)  {
	ready(function() {
		new testKind().renderInto(document.body);
	});
};

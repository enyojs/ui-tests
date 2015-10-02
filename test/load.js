var i18n = require('enyo/i18n'),
	//require ilib for changing locale
	ready = require('enyo/ready');

var locale = window.location.hash.replace(/^#/, '');

require('enyo-ilib');

if(locale) {
	i18n.updateLocale(locale);
}

module.exports = function(TestKind)  {
	ready(function() {
		new TestKind().renderInto(document.body);
	});
};

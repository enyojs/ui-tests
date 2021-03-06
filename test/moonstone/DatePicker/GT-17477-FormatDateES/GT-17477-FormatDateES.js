var
	i18n = require('enyo/i18n'),
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	ilib = require('enyo-ilib');

var
	Scroller = require('moonstone/Scroller'),
	DatePicker = require('moonstone/DatePicker'),
	Button = require('moonstone/Button'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText');

var
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-17477-FormatDateES',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-7h moon-vspacing-s', components: [
					{kind: DatePicker, name: 'picker', noneText: 'Pick a Date', content: 'Date', onChange: 'changed'},
					{kind: Button, name: 'buttonReset', content: 'Reset Date', small: true, ontap: 'resetTapped'},					
					{name: 'localePicker', kind: ExpandablePicker, noneText: 'No Locale Selected', content: 'Choose Locale', onChange: 'setLocale', components: [
						{content: 'Use Default Locale', active: true},
						{content: 'am-ET'},
						{content: 'ko-KR'},
						{content: 'zh-TW'},
						{content: 'fa-IR'},
						{content: 'ar-SA'},
						{content: 'ur-IN'},
						{content: 'th-TH'},	//Thailand
						{content: 'en-US'},
						{content: 'jp-JP'},
						{content: 'en-CA'},
						{content: 'en-IE'},
						{content: 'en-GB'},
						{content: 'en-MX'},
						{content: 'de-DE'},
						{content: 'fr-FR'},
						{content: 'fr-CA'},
						{content: 'it-IT'},
						{content: 'es-ES'},
						{content: 'es-MX'},
						{content: 'es-US'}
					]}
				]}
			]},
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'No change yet'}
		],
		create: function(){
			this.inherited(arguments);
			if (!ilib) {
				this.$.localePicker.hide();
				this.log('iLib not present -- hiding locale picker');
			}
		},
		setLocale: function(sender, event){
			if (ilib) {
				var locale = event.selected.content,
					val = (locale == 'Use Default Locale') ? null : locale;
				i18n.updateLocale(locale);
				this.$.picker.setLocale(val);
				this.$.disabledPicker.setLocale(val);
				this.$.result.setContent(event.originator.name + ' changed to ' + val);
			}
			return true;
		},
		setDate: function() {
			var current = this.$.picker.value || new Date();
			var year = isNaN(parseInt(this.$.yearInput.getValue(), 0)) ? current.getFullYear() : parseInt(this.$.yearInput.getValue(), 0);
			var month = isNaN(parseInt(this.$.monthInput.getValue(), 0)) ? current.getMonth() : parseInt(this.$.monthInput.getValue(), 0) - 1;
			var day = isNaN(parseInt(this.$.dayInput.getValue(), 0)) ? current.getDate() : parseInt(this.$.dayInput.getValue(), 0);
			this.$.picker.set('value', new Date(year, month, day));
		},
		resetDate: function() {
			this.$.picker.set('value', new Date());
		},
		changed: function(sender, event) {
			if (this.$.result && event.value){
				this.$.result.setContent(event.name + ' changed to ' + event.value.toDateString());
			}
		},
		resetTapped: function() {
			this.$.picker.set('value', null);
			this.$.picker.set('open', false);
			return true;
		}
	});
load(Test);
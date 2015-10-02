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
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText');

var
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-11194-ActiveDayChanges',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-7h moon-vspacing-s', components: [
					{kind: DatePicker, name: 'picker', noneText: 'Pick a Date', content: 'Date', onChange: 'changed'},
					{kind: Button, name: 'buttonReset', content: 'Reset Date', small: true, ontap: 'resetTapped'},
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
			this.$.picker.set('value', new Date('Oct 01 2015'));
		},
		setLocale: function(sender, event){
			var locale = event.selected.content;
			locale = locale == 'Use Default Locale' ? null : locale;
			i18n.updateLocale(locale);
			this.$.result.setContent(event.originator.name + ' changed to ' + ilib.getLocale());
			return true;
		},
		setDate: function() {
			this.$.picker.set('value', new Date('Oct 01 2015'));
		},
		resetDate: function() {
			this.$.picker.set('value', new Date('Oct 01 2015'));
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
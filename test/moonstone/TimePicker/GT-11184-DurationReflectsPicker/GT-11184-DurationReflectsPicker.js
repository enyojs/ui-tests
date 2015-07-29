var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	ilib = require('enyo-ilib');

var
	FittableRows = require('layout/FittableRows');

var
	TimePicker = require('moonstone/TimePicker'),
	Scroller = require('moonstone/Scroller'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	load = require('../../../load'),
	Test = kind({
	name: 'test.GT-11184-DurationReflectsPicker',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-7h moon-vspacing-s', components: [								
				{kind: TimePicker, name: 'pickerTime', noneText: 'Pick a Time', content: 'Time', meridiemEnable: true, onChange: 'timeChanged'},
			]}
		]},
		{kind: Divider, content:'Result'},
		{kind: BodyText, name: 'result', content: 'No change yet'}
	],
	bindings: [		
		{from:'.value', to:'.$.pickerTime.value', oneWay:false}
	],
	create: function(){
		this.inherited(arguments);
		if (!ilib) {
			this.$.pickerLocale.hide();
			this.log('iLib not present -- hiding locale picker');
		}
		this.set('value', new Date('Mar 09 2014 01:50 PM'));
	},
	setLocale: function(inSender, inEvent){
		if (ilib) {
			var locale = inEvent.selected.content,
				val = (locale == 'Use Default Locale') ? null : locale;
				console.log(locale);
			i18n.updateLocale(locale);
			this.$.pickerDateLinked.setLocale(val);
			this.$.pickerTimeLinked.setLocale(val);
			this.$.pickerTime.setLocale(val);
			this.$.pickerDisabled.setLocale(val);
			this.$.result.setContent('locale changed to ' + locale);
		}
		return true;
	},
	timeChanged: function(inSender, inEvent) {
		if (this.$.result && inEvent.value){
			var timeArray = inEvent.value.toTimeString().split(':');
			this.$.result.setContent(inEvent.name + ' changed to ' + timeArray[0] + ':' + timeArray[1]);
		}
	},
	dateChanged: function(inSender, inEvent) {
		if (this.$.result && inEvent.value){
			this.$.result.setContent(inEvent.name + ' changed to ' + inEvent.value.toDateString());
		}
	},
	resetTapped: function() {
		this.$.pickerTime.set('open', false);
		this.$.pickerTime.set('value', null);
		return true;
	}
});
load(Test);
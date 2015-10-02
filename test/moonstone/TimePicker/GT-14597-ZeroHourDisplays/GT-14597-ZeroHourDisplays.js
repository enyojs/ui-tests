var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	ilib = require('enyo-ilib'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-14597-ZeroHourDisplays',		
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-7h moon-vspacing-s', components: [
					{kind: TimePicker, name:'pickerTime', noneText: 'Pick a Time', content: 'Time', meridiemEnable: true, onChange: 'timeChanged'},
					{kind: ExpandablePicker, name: 'pickerLocale', noneText: 'No Locale Selected', content: 'Choose Locale', onChange:'setLocale', components: [
						{content: 'Use Default Locale', active: true},
						{content: 'fr-FR'}
					]}
				]}
			]}
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
			this.set('value', new Date('Mar 08 2015 23:59'));
		},
		setLocale: function(inSender, inEvent){
			if (ilib) {
				var locale = inEvent.selected.content,
				val = (locale == 'Use Default Locale') ? null : locale;
				i18n.updateLocale(locale);
				this.$.pickerTime.setLocale(val);
			}
			return true;
		}
	});

load(Test);
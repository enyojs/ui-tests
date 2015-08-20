var
	kind = require('enyo/kind'),
	TimePicker = require('moonstone/TimePicker'),
	Scroller = require('moonstone/Scroller'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-11134-MeridiemLoops',
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-7h moon-vspacing-s', components: [
					{kind: TimePicker, name:'pickerTime', noneText: 'Pick a Time', content: 'Time', meridiemEnable: true, onChange: 'timeChanged'}
				]}
			]}
		],
		bindings: [
			{from:'.value', to:'.$.pickerTime.value', oneWay:false}
		],
		create: function(){
			this.inherited(arguments);
			this.set('value', new Date('Mar 09 2014 12:34 AM'));
		}
	});

load(Test);
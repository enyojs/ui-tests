var
	kind = require('enyo/kind'),
	TimePicker = require('moonstone/TimePicker'),
	DatePicker = require('moonstone/DatePicker'),
	load = require('../../../load'),
	Test = kind({
		name: "test.GT-11270-DaylightSavings",
		classes: "moon enyo-unselectable enyo-fit",
		components: [
			{kind: DatePicker, name:"pickerDateLinked", noneText: "Pick a Date", content: "Linked Date", onChange: "dateChanged"},
			{kind: TimePicker, name:"pickerTimeLinked", noneText: "Pick a Time", content: "Linked Time", meridiemEnable: true, onChange: "timeChanged"}

		],
		bindings: [
			{from: ".value", to: ".$.pickerDateLinked.value", oneWay: false},
			{from: ".value", to: ".$.pickerTimeLinked.value", oneWay: false}
		],
		create: function(){
			this.inherited(arguments);
			this.set("value", new Date("Mar 08 2015 01:59"));
		}
	});
load(Test);
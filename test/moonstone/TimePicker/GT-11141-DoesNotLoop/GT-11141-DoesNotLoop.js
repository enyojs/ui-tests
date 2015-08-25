var
	kind = require('enyo/kind'),
	DatePicker = require('moonstone/DatePicker'),
	TimePicker = require('moonstone/TimePicker'),
	Button = require('moonstone/Button'),
	load = require('../../../load'),
	Test = kind({
		name: "test.GT-11141-DoesNotLoop",
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
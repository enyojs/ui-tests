var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	dispatcher = require('enyo/dispatcher'),
	TimePicker = require('moonstone/TimePicker'),
	Button = require('moonstone/Button'),
	Test = kind({
		name: "test.GT-11132-Reset",
		classes: "moon enyo-unselectable enyo-fit",
		components: [
			{kind: TimePicker, name: "pickerTime", noneText: "Pick a Time", content: "Time", meridiemEnable: true},
			{kind: Button, name: "buttonReset", content: "Reset Time", small: true, ontap: "clearPicker"}

		],
		clearPicker: function() {
			this.$.pickerTime.set("open", false);
			this.$.pickerTime.set("value", null);
			return true;
		}
	});

ready(function() {
	window.dispatcher = dispatcher;
	new Test().renderInto(document.body);
});

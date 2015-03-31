enyo.kind({
	name: "test.DaylightSavings",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: "moon.DatePicker", name:"pickerDateLinked", noneText: "Pick a Date", content: "Linked Date", onChange: "dateChanged"},
		{kind: "moon.TimePicker", name:"pickerTimeLinked", noneText: "Pick a Time", content: "Linked Time", meridiemEnable: true, onChange: "timeChanged"}

	],
	bindings: [
		{from: ".value", to: ".$.pickerDateLinked.value", oneWay: false},
		{from: ".value", to: ".$.pickerTimeLinked.value", oneWay: false}
	],
	create: function(){
		this.inherited(arguments);
		this.set("value", new Date("Mar 09 2014 01:59"));
	}
});

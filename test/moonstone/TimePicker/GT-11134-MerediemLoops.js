enyo.kind({
	name: "test.GT-11134-MerediemLoops",
	kind: "FittableRows",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: 'moon.Scroller', fit: true, components: [
			{classes: "moon-7h moon-vspacing-s", components: [
				{kind: "moon.TimePicker", name:"pickerTime", noneText: "Pick a Time", content: "Time", meridiemEnable: true, onChange: "timeChanged"}
			]}
		]}
	],
	bindings: [
		{from:".value", to:".$.pickerTime.value", oneWay:false}
	],
	create: function(){
		this.inherited(arguments);
		this.set("value", new Date("Mar 09 2014 12:34 AM"));
	}
});

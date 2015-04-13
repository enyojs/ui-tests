enyo.kind({
	name: "test.GT-11132-Reset",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: "moon.TimePicker", name: "pickerTime", noneText: "Pick a Time", content: "Time", meridiemEnable: true},
		{kind: "moon.Button", name: "buttonReset", content: "Reset Time", small: true, ontap: "clearPicker"},

	],
	clearPicker: function() {
		this.$.pickerTime.set("open", false);
		this.$.pickerTime.set("value", null);
		return true;
	}
});

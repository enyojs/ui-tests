enyo.kind({
	name: "test.DefaultLocale",
	kind: "FittableRows",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: 'moon.Scroller', fit: true, components: [
			{classes: "moon-7h moon-vspacing-s", components: [
				{kind: "moon.DatePicker", name:"pickerDateLinked", noneText: "Pick a Date", content: "Linked Date", onChange: "dateChanged"},
				{kind: "moon.TimePicker", name:"pickerTimeLinked", noneText: "Pick a Time", content: "Linked Time", meridiemEnable: true, onChange: "timeChanged"},
				{kind: "moon.ExpandablePicker", name: "pickerLocale", noneText: "No Locale Selected", content: "Choose Locale", onChange:"setLocale", components: [
					{content: "Use Default Locale", active: true},
					{content: "jp-JP"}
				]}
			]},
		]}
	],
	bindings: [
		{from:".value", to:".$.pickerDateLinked.value", oneWay:false},
		{from:".value", to:".$.pickerTimeLinked.value", oneWay:false}
	],
	create: function(){
		this.inherited(arguments);
		if (!window.ilib) {
			this.$.pickerLocale.hide();
			this.log("iLib not present -- hiding locale picker");
		}
		this.set("value", new Date("Mar 09 2014 01:59"));
	},
	setLocale: function(inSender, inEvent){
		if (window.ilib) {
			var locale = inEvent.selected.content,
				val = (locale == "Use Default Locale") ? null : locale;
			enyo.updateLocale(locale);
			this.$.pickerDateLinked.setLocale(val);
			this.$.pickerTimeLinked.setLocale(val);
		}
		return true;
	}
});
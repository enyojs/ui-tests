enyo.kind({
	name: "test.GT-14597-ZeroHourDisplays",
	kind: "FittableRows",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: 'moon.Scroller', fit: true, components: [
			{classes: "moon-7h moon-vspacing-s", components: [
				{kind: "moon.TimePicker", name:"pickerTime", noneText: "Pick a Time", content: "Time", meridiemEnable: true, onChange: "timeChanged"},
				{kind: "moon.ExpandablePicker", name: "pickerLocale", noneText: "No Locale Selected", content: "Choose Locale", onChange:"setLocale", components: [
					{content: "Use Default Locale", active: true},
					{content: "fr-FR"}
				]}
			]}
		]}
	],
	bindings: [
		{from:".value", to:".$.pickerTime.value", oneWay:false}
	],
	create: function(){
		this.inherited(arguments);
		if (!window.ilib) {
			this.$.pickerLocale.hide();
			this.log("iLib not present -- hiding locale picker");
		}
		this.set("value", new Date("Mar 09 2014 23:59"));
	},
	setLocale: function(inSender, inEvent){
		if (window.ilib) {
			var locale = inEvent.selected.content,
					val = (locale == "Use Default Locale") ? null : locale;
			enyo.updateLocale(locale);
			this.$.pickerTime.setLocale(val);
		}
		return true;
	}
});

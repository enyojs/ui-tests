enyo.kind({
	name: "test.GT-15940-DaysStringDisplay",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: "moon.Panels", pattern: "activity", classes: "enyo-fit", components: [
			{kind: "moon.Panel", name: "nonGroupedPanel", onChange: "pickerChanged", title: "Expandable", headerType: "medium", titleBelow: "Not grouped", style: "width:50%;", components: [
				{kind: "moon.Scroller", horizontal: "hidden", classes: "enyo-fill", components: [
					{style: "max-width: 500px;", components: [						
						{kind: "moon.DayPicker", noneText: "Pick a Day", content: "Day Picker"}						
					]}
				]}
			]},			
		]}
	],
	create: enyo.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);

			var c = new enyo.Collection([
				{label: "Item 1"},
				{label: "Item 2"},
				{label: "Item 3"},
				{label: "Item 4"},
				{label: "Item 5"}
			]);
		};
	}),
	pickerChanged: function(inSender, inEvent) {
		var value,
			picker = inEvent.originator.getContent();
		if (inEvent.originator instanceof moon.ExpandablePicker) {
			value = inEvent.content;
			inSender.setSubTitleBelow(picker + " changed to '" + value + "'");
		} else if ((inEvent.originator instanceof moon.ExpandableIntegerPicker) ||
					(inEvent.originator instanceof moon.DatePicker) ||
					(inEvent.originator instanceof moon.TimePicker) ||
					(inEvent.originator instanceof moon.ExpandableInput)) {
			value = inEvent.originator.getValue();
			inSender.setSubTitleBelow(picker + " changed to '" + value + "'");
		}
	},
	// when called, go into loop of opening/closing pickers every second
	stressTest: function() {
		var pickers = [
			"datePicker",
			"datePicker2",
			"expandableInput",
			"expandableInput2",
			"expandableIntegerPicker",
			// disabled "expandableIntegerPicker2",
			"expandableIntegerPicker3",
			// disabled "expandableIntegerPicker4",
			"expandablePicker",
			"expandablePicker2",
			"expandablePicker3",
			"expandablePicker4",
			// disabled "expandablePicker5",
			"expandablePicker6",
			"expandablePicker7",
			"expandablePicker8",
			"expandablePicker9",
			"expandablePicker10",
			// disabled "expandablePicker11",
			"expandablePicker12",
			"timePicker",
			"timePicker2",
			"expandableDataPicker",
			"expandableDataPicker2"
		];
		var index = 0;
		var opened = false;
		setInterval(this.bindSafely(function() {
			if (opened) {
				this.$[pickers[index++]].setOpen(false);
			} else {
				this.$[pickers[index]].setOpen(true);
			}
			opened = !opened;
			index = index % pickers.length;
		}), 1000);
	}
});

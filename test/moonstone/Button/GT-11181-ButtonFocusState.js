enyo.kind({
  name: "test.GT-11181-ButtonFocusState",
	kind:"FittableRows",
	classes: "moon enyo-unselectable enyo-fit moon-button-sample",
	components: [
		{kind: 'moon.Scroller', fit: true, components: [
			{classes: "moon-button-sample-wrapper", components: [

				{kind: "moon.Divider", content: "Grouped Buttons:"},
				{kind: "enyo.Group", classes: "moon-button-sample-group", components: [
					{name: "appleButton", kind: "moon.Button", content: "Apple", ontap: "buttonTapped"},
					{name: "bananaButton", kind: "moon.Button", content: "Banana", ontap: "buttonTapped"},
					{name: "saskatoonberryButton", kind: "moon.Button", content: "Saskatoonberry", ontap: "buttonTapped"}
				]},
        {kind: "moon.Divider", content: "Grouped Buttons:"}
			]}
		]},
		{kind: "moon.Divider", content: "Result"},
		{kind: "moon.BodyText", name: "result", allowHtml: true, content: "No button pressed yet."}
	],
	buttonTapped: function(inSender, inEvent) {
		this.$.result.setContent("&quot;" + inSender.name + "&quot; pressed.");
	},
	showButtonTapped: function () {
		this.$.hiddenButton.show();
	}
});

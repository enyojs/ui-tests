enyo.kind({
	name: "test.GT-13617-TooltipButtonDoesntBlink",
	kind: "FittableRows",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{name:"buttonContainer", kind:"FittableRows", classes:"enyo-fill", components:[
			//Top row of buttons
			{classes: "moon-5v", components:[
				{kind: "moon.TooltipDecorator", style:"float:right", components: [
					{kind: "moon.Button", content: "Right Tooltip"},
					{name: "toolTip", kind: "moon.Tooltip", uppercase: false, content: "I'm a right tooltip."}
				]}
			]},



		]}
	]
});

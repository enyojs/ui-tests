var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	Button = require('moonstone/Button'),
	CaptionDecorator = require('moonstone/CaptionDecorator'),
	ToggleItem = require('moonstone/ToggleItem'),
	BodyText = require('moonstone/BodyText');

var	
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-11220-5wayTriggerSpotlight',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-button-sample-wrapper', components: [
					{kind: Divider, content: 'Captioned Buttons:'},
					{kind: CaptionDecorator, side: 'top', content: 'Pow', components: [
						{name: 'captionedAButton', kind: Button, content: 'A', ontap: 'buttonTapped'}
					]},
					{kind: CaptionDecorator, side: 'right', content: 'Boom', components: [
						{name: 'captionedBButton', kind: Button, content: 'B', ontap: 'buttonTapped'}
					]},
					{kind: CaptionDecorator, side: 'bottom', content: 'Crash', components: [
						{name: 'captionedCButton', kind: Button, content: 'C', ontap: 'buttonTapped'}
					]},
					{kind: CaptionDecorator, side: 'left', content: 'Bang', components: [
						{name: 'captionedDButton', kind: Button, content: 'D', ontap: 'buttonTapped'}
					]},
					{classes: 'moon-2v'},

					{kind: Divider, content: 'Captioned Buttons with showOnFocus option:'},
					{kind: CaptionDecorator, side: 'top', showOnFocus: true, content: 'Pow', components: [
						{name: 'showOnFocusCaptionTopButton', kind: Button, content: 'Top', ontap: 'buttonTapped'}
					]},
					{kind: CaptionDecorator, side: 'bottom', showOnFocus: true, content: 'Crash', components: [
						{name: 'showOnFocusCaptionBottomButton', kind: Button, content: 'Bottom', ontap: 'buttonTapped'}
					]},
					{style: 'display:inline-block;', classes: 'moon-2h'},
					{kind: CaptionDecorator, side: 'left', showOnFocus: true, content: 'Bang', components: [
						{name: 'showOnFocusCaptionLeftButton', kind: Button, content: 'Left', ontap: 'buttonTapped'}
					]},
					{kind: CaptionDecorator, side: 'right', showOnFocus: true, content: 'Boom', components: [
						{name: 'showOnFocusCaptionRightButton', kind: Button, content: 'Right', ontap: 'buttonTapped'}
					]},					
				]}
			]},
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
		],
		buttonTapped: function(inSender, inEvent) {
			this.$.result.setContent('&quot;' + inSender.name + '&quot; pressed.');
		},
		showButtonTapped: function () {
			this.$.hiddenButton.show();
		},
		showSmallButtonTapArea: function(inSender, inEvent) {
			if (inEvent.checked) {
				this.addClass('visible-tap-area');
			} else {
				this.removeClass('visible-tap-area');
			}
		}
	});

load(Test);
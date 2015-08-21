var
	kind = require('enyo/kind'),
	Button = require('moonstone/Button'),
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText'),
	Group = require('enyo/Group'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-11181-ButtonFocusState',		
		classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-button-sample-wrapper', components: [

					{kind: Divider, content: 'Grouped Buttons:'},
					{kind: Group, classes: 'moon-button-sample-group', components: [
						{name: 'appleButton', kind: Button, content: 'Apple', ontap: 'buttonTapped'},
						{name: 'bananaButton', kind: Button, content: 'Banana', ontap: 'buttonTapped'},
						{name: 'saskatoonberryButton', kind: Button, content: 'Saskatoonberry', ontap: 'buttonTapped'}
					]},
	        {kind: Divider, content: 'Grouped Buttons:'}
				]}
			]},
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
		],
		buttonTapped: function(inSender) {
			this.$.result.setContent('&quot;' + inSender.name + '&quot; pressed.');
		},
		showButtonTapped: function () {
			this.$.hiddenButton.show();
		}
	});
load(Test);
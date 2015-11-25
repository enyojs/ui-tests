var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Button = require('moonstone/Button'),
	BodyText = require('moonstone/BodyText'),
	load = require('../../../load'),
	Test = kind({	
		name: 'moon.GT-16541-TranslucentButtonPressedState',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-button-sample-wrapper', components: [					
					{classes: 'image-background', components: [					
						{name: 'translucentButton', kind: Button, minWidth: false, backgroundOpacity: 'translucent', content: 'Translucent', ontap: 'buttonTapped'}					
					]}
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
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
		name: 'test.GT-16542-TransparentButtonPressedState',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-button-sample-wrapper', components: [					
					{classes: 'image-background', components: [					
						{name: 'transparentButton', kind: Button, minWidth: false, backgroundOpacity: 'transparent', content: 'Transparent',  ontap: 'buttonTapped'},
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
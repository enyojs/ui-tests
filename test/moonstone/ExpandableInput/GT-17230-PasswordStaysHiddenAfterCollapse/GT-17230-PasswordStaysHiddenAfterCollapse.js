var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	Scroller = require('moonstone/Scroller');

var
	load = require('../../../load'),
	Test = kind({
	name: 'test.GT-17230-PasswordStaysHiddenAfterCollapse',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, horizontal: 'hidden', fit: true, components: [
			{classes:'moon-5h', components: [				
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input with password type', type: 'password'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'Input:', allowHtml: true}
	],
	inputChanging: function(inSender, inEvent) {
		this.$.console.setContent('<em>'+inSender.getContent() + '</em> changing: \'' + inEvent.originator.getValue() + '\'');
	},
	inputChanged: function(inSender) {
		this.$.console.setContent('<em>'+inSender.getContent() + '</em> changed to: \'' + inSender.getValue() + '\'');
	}
});

load(Test);

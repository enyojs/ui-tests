var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Button = require('moonstone/Button'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-11235-StillDisplayAfterPointerTimeout',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{name:'buttonContainer', kind: FittableRows, classes:'enyo-fill', components:[
				//Top row of buttons
				{classes: 'moon-5v', components:[
					{kind: TooltipDecorator, style:'float:right', components: [
						{kind: Button, content: 'Right Tooltip'},
						{name: 'toolTip', kind: Tooltip, uppercase: false, content: 'I\'m a right tooltip.'}
					]}
				]},
			]}
		]
	});
load(Test);
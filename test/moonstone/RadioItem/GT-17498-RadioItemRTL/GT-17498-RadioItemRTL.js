var
	kind = require('enyo/kind'),
	ilib = require('enyo-ilib');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	RadioItem = require('moonstone/RadioItem'),
	RadioItemGroup = require('moonstone/RadioItemGroup'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-17498-RadioItemRTL',
		classes: 'moon enyo-unselectable enyo-fit',
		kind: FittableRows,
		components: [
			{fit: true, components: [
				{kind: Divider, content: 'Radio Items'},
				{style: 'margin: 0 10px', onActivate: 'buttonActivated', components: [
					{kind: RadioItem, content: 'Cat'},
					{kind: RadioItem, content: 'Dog'},
					{kind: RadioItem, content: 'Whale', disabled: true},
					{kind: RadioItem, content: 'Monte Verde Golden Toad'}
				]},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Radio Item Group'},
				{kind: RadioItemGroup, onActivate: 'buttonActivated', components: [
					{content: 'Raspberry'},
					{content: 'Blackberry'},
					{content: 'Strawberry', disabled: true},
					{content: 'Persimmon is botanical berries'}
				]},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Pre-selected Radio Item Group'},
				{kind: RadioItemGroup, onActivate: 'buttonActivated', components: [
					{content: 'Creek'},
					{content: 'River', selected: true},
					{content: 'Waterfall', disabled: true},
					{content: 'Ocean is big big big water'}
				]}
			]},
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'No action yet.'}
		],
		buttonActivated: function (sender, event) {
			var originator = event.originator,
				str = 'The \'';

			if (!originator || !this.hasNode()) {
				return;
			}

			str += (event.originator.getActive() && event.originator.kind === RadioItem) ? originator.getContent() : originator.name;
			str +=  '\' item is selected.';

			this.$.result.setContent(str);
		}
	});
load(Test);
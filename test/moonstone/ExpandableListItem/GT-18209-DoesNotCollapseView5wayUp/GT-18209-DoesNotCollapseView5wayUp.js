var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	ExpandableListItem = require('moonstone/ExpandableListItem'),
	Scroller = require('moonstone/Scroller'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-18209-DoesNotCollapseView5wayUp',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit',
		handlers: {
			onActivate: 'activateHandler'
		},
		components: [
			{kind: Scroller, horizontal: 'hidden', fit: true, components: [
				{classes:'moon-5h', components: [
					{kind: ExpandableListItem, content: 'Expandable ListItem', components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]},
					{kind: ExpandableListItem, disabled:true, content:'Disabled ListItem', components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]},
					{kind: ExpandableListItem, content: 'Pre-expanded ListItem', open: true, components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]},
					{kind: ExpandableListItem, content: 'Bottom-locking', lockBottom: true, open: true, components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]},
					{kind: ExpandableListItem, content: 'Auto-collapsing', autoCollapse: true, components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]},
					{kind: Group, highlander: true, components: [
						{kind: ExpandableListItem,  open: true,
							content: 'This is a grouped ExpandableListItem', components: [
								{content: 'Item One'},
								{content: 'Item Two'}
							]
						},
						{kind: ExpandableListItem,
							content: 'This is another grouped ExpandableListItem', components: [
								{content: 'Item Three'},
								{content: 'Item Four'}
							]
						},
						{kind: ExpandableListItem,
							content: 'This is yet another grouped ExpandableListItem', components: [
								{content: 'Item Five'},
								{content: 'Item Six'}
							]
						}
					]}
				]}
			]},
			{kind: Divider, content:'Result'},
			{kind: BodyText, name: 'console', content: 'Event'}
		],
		activateHandler: function(inSender, inEvent) {
			if (this.generated && inEvent.originator instanceof ExpandableListItem) {
				this.$.console.setContent(inEvent.originator.getContent() + ' is now ' + (inEvent.originator.getActive() ? 'open' : 'closed'));
			}
		}
	});
load(Test);

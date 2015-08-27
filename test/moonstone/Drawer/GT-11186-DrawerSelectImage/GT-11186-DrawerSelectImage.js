var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	Drawers = require('moonstone/Drawers'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-11186-DrawerSelectImage',
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{
				name: 'drawers',
				kind: Drawers,
				drawers: [
					{
						name: 'partialDrawer',
						open: false,
						controlsOpen: false,
						onActivate: 'partialDrawerChanged',
						onDeactivate: 'partialDrawerChanged',
						handle: {name: 'handleButton', content: 'Partial drawer with long text truncation'},
						components: [
							{kind: Panel, classes:'enyo-fit', title: 'Partial Drawer', components: [
								{kind: Item, content: 'Item One'},
								{kind: Item, content: 'Item Two'}
							]}
						],
						controlDrawerComponents: [
							{classes:'moon-hspacing', components: [
								{kind: Button, name: 'openMoreButton', content: 'Open More', ontap: 'openMainDrawer'},
								{kind: Button, content: 'Close', ontap: 'close'}
							]}
						]
					},
					{
						name: 'searchDrawer',
						handle: {content: 'Full drawer'},
						components: [
							{kind: Panel, classes:'enyo-fit', title: 'Full Drawer', components: [
								{kind: Item, content: 'Item One'},
								{kind: Item, content: 'Item Two'}
							]}
						]
					}
				],
				components: [
					{
						name: 'panels',
						kind: Panels,
						pattern: 'activity',
						classes: 'enyo-fit',
						components: [
							{title: 'First Panel', classes: 'moon-7h', components: [
								{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
									{kind: ExpandablePicker, onChange: 'pickerChangedImg', content: 'Select Image', components: [
										{content: 'Music',value: 'ui-tests/lib/moonstone/images/drawer_icon.png'},
										{content: 'LG', value: '/ui-tests/lib/moonstone/images/lg.png'},
										{content: 'HTML5', value: '/ui-tests/lib/moonstone/images/html5-icon.png'},
										{content: 'CSS3', value: 'ui-tests/lib/moonstone/images/css3-icon.png'},
										{content: 'Default', value: '', active: true}
									]},
									{kind: ExpandablePicker, onChange: 'pickerChangedIcon', content: 'Select Icon', components: [
										{content: 'Drawer', value: 'drawer'},
										{content: 'FullScreen', value: 'fullscreen'},
										{content: 'Circle', value: 'circle'},
										{content: 'Stop', value: 'stop'},
										{content: 'Play', value: 'play'},
										{content: 'Pause', value: 'pause'},
										{content: 'Forward', value: 'forward'},
										{content: 'Default', value: '', active: true}
									]},
									{kind: Item, content: 'Item One', ontap: 'next'},
									{kind: Item, content: 'Item Two', ontap: 'next'}
								]}
							]},
							{title: 'Second Panel', classes: 'moon-7h', components: [
								{kind: Item, content: 'Item One', ontap: 'next'},
								{kind: Item, content: 'Item Two', ontap: 'next'},
								{kind: Item, content: 'Item Three', ontap: 'next'},
								{kind: Item, content: 'Item Four', ontap: 'next'},
								{kind: Item, content: 'Item Five', ontap: 'next'}
							]},
							{title: 'Third Panel', classes: 'moon-7h', components: [
								{kind: Item, content: 'Item One', ontap: 'next'},
								{kind: Item, content: 'Item Two', ontap: 'next'},
								{kind: Item, content: 'Item Three', ontap: 'next'},
								{kind: Item, content: 'Item Four', ontap: 'next'},
								{kind: Item, content: 'Item Five', ontap: 'next'}
							]},
							{title: 'Fourth Panel', classes: 'moon-7h', components: [
								{kind: Item, content: 'Item One', ontap: 'next'},
								{kind: Item, content: 'Item Two', ontap: 'next'},
								{kind: Item, content: 'Item Three', ontap: 'next'},
								{kind: Item, content: 'Item Four', ontap: 'next'},
								{kind: Item, content: 'Item Five', ontap: 'next'}
							]},
							{title: 'Fifth Panel', classes: 'moon-7h', components: [
								{kind: Item, content: 'Item One', ontap: 'next'},
								{kind: Item, content: 'Item Two', ontap: 'next'},
								{kind: Item, content: 'Item Three', ontap: 'next'},
								{kind: Item, content: 'Item Four', ontap: 'next'},
								{kind: Item, content: 'Item Five', ontap: 'next'}
							]}
						]
					}
				]
			}
		],
		next: function() {
			this.$.panels.next();
			return true;
		},
		openMainDrawer: function() {
			this.$.partialDrawer.setOpen(true);
		},
		close: function() {
			if (this.$.partialDrawer.getOpen()) {
				this.$.partialDrawer.setOpen(false);
			} else {
				this.$.partialDrawer.setControlsOpen(false);
			}
		},
		partialDrawerChanged: function() {
			this.$.openMoreButton.setShowing(!this.$.partialDrawer.getOpen());
		},
		pickerChangedImg:function(inSender,inEvent){
			this.$.drawers.set('src',inEvent.selected.value);
			//reset the drawer
			this.$.drawers.set('icon','');
		},
		pickerChangedIcon:function(inSender,inEvent){
			this.$.drawers.set('icon',inEvent.selected.value);
			//reset the drawer
			this.$.drawers.set('src','');
		}
	});

load(Test);
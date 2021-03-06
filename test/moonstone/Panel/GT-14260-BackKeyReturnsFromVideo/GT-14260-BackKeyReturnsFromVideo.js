var
	kind = require('enyo/kind');

var
	Spotlight = require('spotlight');

var
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	Panels = require('moonstone/Panels'),
	ToggleItem = require('moonstone/ToggleItem'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

var
	load = require('../../../load'),
	Test = kind({
	name: 'test.GT-14260-BackKeyReturnsFromVideo',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
        {name: 'player', kind: VideoPlayer, src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: 'moonstone/assets/video-poster.png', autoplay: true, showing: false, infoComponents: [
			{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
				{
					kind: ChannelInfo,
					channelNo: '13',
					channelName: 'AMC',
					components: [
						{content: '3D'},
						{content: 'Live'},
						{content: 'REC 08:22', classes: 'redicon'}
					]
				},
				{
					kind: VideoInfoHeader,
					title: 'Downton Abbey - Extra Title',
					subTitle: 'Mon June 21, 7:00 - 8:00pm',
					subSubTitle: 'R - TV 14, V, L, SC',
					description: 'The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
				}
			]},
			{kind: VideoInfoBackground, orient: 'right', background: true, components: [
				{kind: Clock}
			]}
		], components: [
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
		]},
		{name: 'panels', kind: Panels, pattern: 'activity', classes: 'enyo-fit', useHandle: true, onShowingChanged: 'panelsShowingChanged', components: [
			{title: 'First Panel', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next1'},
				{kind: Item, content: 'Item Two', ontap: 'next1'},
				{kind: Item, content: 'Item Three', ontap: 'next1'},
				{kind: Item, content: 'Item Four', ontap: 'next1'},
				{kind: ToggleItem, content: 'Show/Hide Side Handle', checked: true,  onchange: 'handleShowingChanged'}
			]},
			{title: 'Second Panel',
				joinToPrev: true, components: [
				{kind: Item, content: 'Item One', ontap: 'next2'},
				{kind: Item, content: 'Item Two', ontap: 'next2'},
				{kind: Item, content: 'Item Three', ontap: 'next2'},
				{kind: Item, content: 'Item Four', ontap: 'next2'},
				{kind: Item, content: 'Item Five', ontap: 'next2'}
			]},
			{title: 'Third Panel', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next3'},
				{kind: Item, content: 'Item Two', ontap: 'next3'},
				{kind: Item, content: 'Item Three', ontap: 'next3'},
				{kind: Item, content: 'Item Four', ontap: 'next3'},
				{kind: Item, content: 'Item Five', ontap: 'next3'}
			]},
			{title: 'Fourth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next4'},
				{kind: Item, content: 'Item Two', ontap: 'next4'},
				{kind: Item, content: 'Item Three', ontap: 'next4'},
				{kind: Item, content: 'Item Four', ontap: 'next4'},
				{kind: Item, content: 'Item Five', ontap: 'next4'}
			]},
			{title: 'Fifth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next5'},
				{kind: Item, content: 'Item Two', ontap: 'next5'},
				{kind: Item, content: 'Item Three', ontap: 'next5'},
				{kind: Item, content: 'Item Four', ontap: 'next5'},
				{kind: Item, content: 'Item Five', ontap: 'next5'}
			]},
			{title: 'Sixth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next6'},
				{kind: Item, content: 'Item Two', ontap: 'next6'},
				{kind: Item, content: 'Item Three', ontap: 'next6'},
				{kind: Item, content: 'Item Four', ontap: 'next6'},
				{kind: Item, content: 'Item Five', ontap: 'next6'}
			]},
			{title: 'Seventh', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	rendered: function() {
		this.inherited(arguments);
		Spotlight.spot(this.$.panels);
	},
	// custom next handler for each panel to avoid switching from one active panel
	// to another with no visible change for demo
	next1: function() {
		this.$.panels.setIndex(1);
		return true;
	},
	next2: function() {
		this.$.panels.setIndex(2);
		return true;
	},
	next3: function() {
		this.$.panels.setIndex(3);
		return true;
	},
	next4: function() {
		this.$.panels.setIndex(4);
		return true;
	},
	next5: function() {
		this.$.panels.setIndex(5);
		return true;
	},
	next6: function() {
		this.$.panels.setIndex(6);
		return true;
	},
	handleShowingChanged: function(inSender) {
		this.$.panels.setHandleShowing(inSender.getChecked());
	},
	panelsShowingChanged: function (sender, event) {
		// Hiding the VideoPlayer when it would be obscured by the Panels avoids UI performance
		// issues caused by the GPU being occupied rendering video frames that aren't visible.
		this.$.player.set('showing', !event.showing);
	}
});

load(Test);
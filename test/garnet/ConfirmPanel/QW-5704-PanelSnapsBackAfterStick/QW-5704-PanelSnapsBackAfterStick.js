require('garnet');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),

	Button = require('garnet/Button'),
	IconButton = require('garnet/IconButton'),
	PopupPanelScroller = require('garnet/PopupPanelScroller'),
	Panel = require('garnet/Panel'),
	ConfirmPanel = require('garnet/ConfirmPanel'),
	PanelManager = require('garnet/PanelManager');

var ConfirmBasePanel = kind({
	name: 'g.sample.ConfirmBasePanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	handlers: {
		onOK: 'okHandler',
		onCancel: 'cancelHandler'
	},
	components: [
		{name: 'button1', kind: Button, classes: 'g-sample-confirm-panel-button', ontap: 'showPanel', content: 'Only text'},
		{name: 'button2', kind: Button, classes: 'g-sample-confirm-panel-button', ontap: 'showPanel', content: 'Scroll + Text'},
		{name: 'button3', kind: Button, classes: 'g-sample-confirm-panel-button', ontap: 'showPanel', content: 'Icon + Title + Text'},
		{name: 'button4', kind: Button, classes: 'g-sample-confirm-panel-button', ontap: 'showPanel', content: 'Scroll+Icon+Title+Text'}
	],
	popPanels: {
		button1: {
			name: 'confirmPanelNoScrollNoIcon',
			kind: ConfirmPanel,
			onCancel: 'cancelHandler',
			onOK: 'okHandler',
			components: [
				{
					kind: PopupPanelScroller,
					components: [
						{content: 'All the labels follow guideline.'}
					]
				}
			]
		},
		button2: {
			name: 'confirmPanelWithScrollNoIcon',
			kind: ConfirmPanel,
			events: {
				onOK: ''
			},
			buttonComponents: [
				{name: 'ok', kind: IconButton, ontap: 'okHandler', classes: 'g-ok-image'}
			],
			components: [
				{
					kind: PopupPanelScroller,
					components: [
						{content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch'}
					]
				}
			],
			okHandler: function() {
				this.doOK();
			}
		},
		button3: {
			name: 'confirmPanelWithIconNoScroll',
			kind: ConfirmPanel,
			events: {
				onOK: ''
			},
			buttonComponents: [
				{name: 'ok2', kind: IconButton, ontap: 'okHandler', classes: 'g-ok-image'}
			],
			components: [
				{
					kind: PopupPanelScroller,
					icon: true,
					iconSrc: '@../assets/ic_warning.svg',
					title: true,
					titleContent: 'test',
					components: [
						{content: 'All the labels follow guideline.'}
					]
				}
			],
			okHandler: function() {
				this.doOK();
			}
		},
		button4: {
			name: 'confirmPanelWithIconAndScroll',
			kind: ConfirmPanel,
			onCancel: 'cancelHandler',
			onOK: 'okHandler',
			components: [
				{
					kind: PopupPanelScroller,
					icon: true,
					iconSrc: '@../assets/ic_warning.svg',
					title: true,
					titleContent: 'ScrollIconTitleTextPanelTitle',
					components: [
						{content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.et Quad-Core Processor, 1080p resolution screen, 13-megapixel rear'}
					]
				}
			]
		}
	},
	showPanel: function(inSender) {
		var
			name = inSender.name,
			panel = this.popPanels[name];

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	},
	cancelHandler: function(inSender) {
		var name = inSender.name;
		this.bubbleUp('onPopPanel');
		this.doResult({msg: name + ' is hidden by Cancel button'});
	},
	okHandler: function(inSender) {
		var name = inSender.name;
		this.bubbleUp('onPopPanel');
		this.doResult({msg: name + ' is hidden by OK button'});
	}
});

var PanelManager = kind({
	name: 'fixedFloating',
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel',
		onPopPanel: 'popPanel'
	},
	components: [
		{kind: ConfirmBasePanel, classes: 'g-sample-panel'}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, {owner: inEvent.owner});
	},
	popPanel: function () {
		this.popFloatingPanel();
	}
});

var
	load = require('../../../load'),
	Test = kind({
		name: 'test.QW-5704-PanelSnapsBackAfterStick',
		kind: Control,
		classes: 'enyo-unselectable enyo-fit garnet g-sample',
		handlers: {
			onResult: "result",
			onPopPanel: "result"
		},
		components: [
			{kind: PanelManager, classes: 'g-sample-panel-manager'}
		],
		result: function (inSender, inEvent) {
			this.$.result.setContent(inEvent.msg);
		},
		goBack: function() {
			global.history.go(-1);
			return false;
		}
	});

load(Test);
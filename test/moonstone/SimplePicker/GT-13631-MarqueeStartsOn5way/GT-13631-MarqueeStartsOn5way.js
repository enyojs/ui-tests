var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	SimplePicker = require('moonstone/SimplePicker'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-13631-MarqueeStartsOn5way',
		kind: FittableRows,
		classes: 'moon moon-sample-padded enyo-unselectable enyo-fit',
		components:[
			{kind: Scroller, fit: true, components: [
				{kind: Divider, content: 'Picker 1 & 2: Animated'},
				{kind: SimplePicker, name: 'picker1', onChange: 'changed', components: [
					{content: 'San Francisco Airport Terminal Gate 1', active: true},
					{content: 'Boston Airport Terminal Gate 2'},
					{content: 'Tokyo Airport Terminal Gate 3'},
					{content: 'נמל התעופה בן גוריון טרמינל הבינלאומי'}
				]},
			]},
			{components: [
				{kind: Divider, content: 'Result'},
				{kind: BodyText, name: 'result', content: 'No change yet'}
			]}
		],
		toggleShowing: function () {
			this.$.picker6.setShowing(!this.$.picker6.showing);
		},
		changed: function (sender, event) {
			this.$.result.setContent(sender.name + ' changed to ' + event.content + ' (' + event.index + ')');
		},
		changeItem: function () {
			var picker = this.$['picker' + (this.$.which.getSelectedIndex()+1)];
			var val = parseInt(this.$.changeInput.getValue(),10);
			var len = picker.getClientControls().length - 1;
			if (isNaN(val) || val < 0 || val > len) {
				this.$.result.setContent(picker.name + ' value must be an integer between 0-' + len);
			} else {
				picker.setSelectedIndex(val);
			}
		},
		addItem: function () {
			if (!this.$.addInput.getValue()) {
				this.$.result.setContent('Please insert content value.');
				return;
			}
			var picker = this.$['picker' + (this.$.which.getSelectedIndex()+1)];
			picker.createComponent({content:this.$.addInput.getValue()}).render();
			this.$.result.setContent('\'' + this.$.addInput.getValue() + '\' is added to ' + picker.name);
		},
		destroyItem: function () {
			var picker = this.$['picker' + (this.$.which.getSelectedIndex()+1)];
			var sel = picker.getSelected();
			if (sel) {
				sel.destroy();
			}
		}
	});
load(Test);
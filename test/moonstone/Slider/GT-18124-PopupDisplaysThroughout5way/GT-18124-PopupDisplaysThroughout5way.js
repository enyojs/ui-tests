var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	Slider = require('moonstone/Slider'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-18124-PopupDisplaysThroughout5way',
		kind: FittableRows,
		classes: 'moon enyo-unselectable enyo-fit',
		bindings: [
			{from: '.$.slider1.value', to: '.$.slider2.value'},
			{from: '.$.slider1.bgProgress', to: '.$.slider2.bgProgress'}
		],
		components: [
			{kind: Scroller, fit: true, components: [
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Slider 1: Custom Popup Content'},
				{name: 'slider4', kind: Slider, classes: 'rgb-sample-slider',
					popupColor: 'rgb(0, 0, 25)', value: 25, bgProgress: 150, min: 0, max: 255,
					onChanging: 'customChanging', onChange: 'customChanged', onAnimateFinish: 'customAnimateFinish'
				},
				{kind: Divider, content: 'Slider 2: Vertical Orientation'},
				{classes: 'moon-hspacing', components: [
					{classes: 'moon-2h'},
					{name: 'slider8', kind: Slider,
						value: 5, min: 1, max: 10, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, jumpIncrement: '10%', decrementIcon: 'minus', incrementIcon: 'plus', popupSide: 'left', showPercentage: false, onChanging: 'sliderChanging', onChange: 'sliderChanged'
					},
				]},
				{classes: 'moon-1v'},

				{kind: Divider, content: 'Options'},
				{classes: 'moon-8h', defaultKind: CheckboxItem, components: [
					{name: 'lockBarSetting',        checked: true,     content: 'Lock Bar to Knob', onchange: 'changeLockbar'},
					{name: 'animateSetting',        checked: true,     content: 'Animated',        onchange: 'animateActivate'},
					{name: 'popupSetting',          checked: true,     content: 'Show Popup',      onchange: 'changeStatusBubble'},
					{name: 'tapableSetting',        checked: true,     content: 'Tapable',         onchange: 'changeTapable'},
					{name: 'constrainSetting',      checked: false,    content: 'Constrain to Background Progress', onchange: 'changeConstrain'},
					{name: 'elasticSetting',        checked: false,    content: 'Elastic Effect',  onchange: 'changeElastic'},
					{name: 'showPercentageSetting', checked: false,    content: 'Show Percentage', onchange: 'changePercentage'}
				]}
			]},
			{kind: Divider, content: 'Result'},
			{name: 'result', content: 'No slider moved yet.'}
		],
		create: function () {
			FittableRows.prototype.create.apply(this, arguments);
			this.changeLockbar();
			this.animateActivate();
			this.changeStatusBubble();
			this.changeTapable();
			this.changeConstrain();
			this.changeElastic();
		},
		rendered: function () {
			FittableRows.prototype.rendered.apply(this, arguments);
			this.updateSlider4Popup(this.$.slider4.getValue());
		},
		//* @protected
		changeValue: function () {
			var v = this.$.valueInput.getValue();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setValue(v);
				}
			}
		},
		incValue: function () {
			this.$.valueInput.setValue(Math.min(parseInt(this.$.valueInput.getValue() || 0, 10) + 10, 100));
			this.changeValue();
		},
		decValue: function () {
			this.$.valueInput.setValue(Math.max(parseInt(this.$.valueInput.getValue() || 0, 10) - 10, 0));
			this.changeValue();
		},
		changeProgress: function () {
			var v = parseInt(this.$.progressInput.getValue(), 10);

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setBgProgress(v);
				}
			}
		},
		changeIncrement: function () {
			var v = parseInt(this.$.incrementInput.getValue(), 10);

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setIncrement(v);
				}
			}
		},
		incProgress: function () {
			this.$.progressInput.setValue(Math.min(parseInt(this.$.progressInput.getValue() || 0, 10) + 10, 100));
			this.changeProgress();
		},
		decProgress: function () {
			this.$.progressInput.setValue(Math.max(parseInt(this.$.progressInput.getValue() || 0, 10) - 10, 0));
			this.changeProgress();
		},
		sliderChanging: function (sender, event) {
			this.$.result.setContent(sender.name + ' changing: ' + Math.round(event.value));
		},
		sliderChanged: function (sender) {
			this.$.result.setContent(sender.name + ' changed to ' + Math.round(sender.getValue()) + '.');
		},
		customChanging: function (sender, event) {
			this.updateSlider4Popup(event.value);
			this.sliderChanging(sender, event);
		},
		customChanged: function (sender, event) {
			this.updateSlider4Popup(sender.getValue());
			this.sliderChanged(sender, event);
		},
		customAnimateFinish: function (sender, event) {
			this.updateSlider4Popup(event.value);
		},
		updateSlider4Popup: function (inValue) {
			var color = 'rgb(0, 0, ' + Math.round(inValue) + ')';
			this.$.slider4.setPopupContent(color);
			this.$.slider4.setPopupColor(color);
		},
		changeLockbar: function () {
			var ck = this.$.lockBarSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setLockBar(ck);
				}
			}
			return true;
		},
		animateActivate: function () {
			var ck = this.$.animateSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setAnimate(ck);
				}
			}
			return true;
		},
		changeStatusBubble: function () {
			var ck = this.$.popupSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].set('popup', ck);
				}
			}
			return true;
		},
		changeTapable: function () {
			var ck = this.$.tapableSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setTappable(ck);
				}
			}
			return true;
		},
		changeConstrain: function () {
			var ck = this.$.constrainSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setConstrainToBgProgress(ck);
				}
			}
			return true;
		},
		changeElastic: function () {
			var ck = this.$.elasticSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setElasticEffect(ck);
				}
			}
			return true;
		},
		changePercentage: function () {
			var ck = this.$.showPercentageSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setShowPercentage(ck);
				}
			}
			return true;
		}
	});
load(Test);
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	Slider = require('moonstone/Slider'),
	load = require('../../../load'),
		Test = kind({
		kind: FittableRows,
		name: 'test.GT-11069-TooltipChangesDirectionSlider',
		classes: 'moon enyo-unselectable enyo-fit',
		bindings: [
			{from: '.$.slider1.value', to:'.$.slider2.value'},
			{from: '.$.slider1.bgProgress', to: '.$.slider2.bgProgress'}
		],
		components: [
			{kind: Scroller, fit: true, components: [
				{classes:'moon-1v'},
				{kind: Divider, content: 'Slider 1: Default'},
				{name: 'slider1', kind: Slider, showPercentage: false, value: 25, bgProgress: 35, onChanging: 'sliderChanging', onChange: 'sliderChanged'},

				{kind: Divider, content:'Slider 2: Disabled, Bound to Slider 1'},
				{name: 'slider2', kind: Slider, disabled: true},

				{kind: Divider, content: 'Slider 3: Custom Popup Content'},
				{name: 'slider3', kind: Slider, classes: 'rgb-sample-slider',
					popupColor: 'rgb(0, 0, 25)', value: 25, bgProgress: 150, min: 0, max: 255,
					onChanging: 'customChanging', onChange: 'customChanged', onAnimateFinish: 'customAnimateFinish'
				}
			]},
			{kind: Divider, content:'Result'},
			{name:'result', content:'No slider moved yet.'}
		],
		create: function() {
			this.inherited(arguments);
		},
		rendered: function() {
			this.inherited(arguments);
			this.updateSlider3Popup(this.$.slider3.getValue());
		},
		//* @protected
		changeValue: function() {
			var v = this.$.valueInput.getValue();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setValue(v);
				}
			}
		},
		incValue: function() {
			this.$.valueInput.setValue(Math.min(parseInt(this.$.valueInput.getValue() || 0, 10) + 10, 100));
			this.changeValue();
		},
		decValue: function() {
			this.$.valueInput.setValue(Math.max(parseInt(this.$.valueInput.getValue() || 0, 10) - 10, 0));
			this.changeValue();
		},
		changeProgress: function() {
			var v = parseInt(this.$.progressInput.getValue(), 10);

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setBgProgress(v);
				}
			}
		},
		changeIncrement: function() {
			var v = parseInt(this.$.incrementInput.getValue(), 10);

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setIncrement(v);
				}
			}
		},
		incProgress: function() {
			this.$.progressInput.setValue(Math.min(parseInt(this.$.progressInput.getValue() || 0, 10) + 10, 100));
			this.changeProgress();
		},
		decProgress: function() {
			this.$.progressInput.setValue(Math.max(parseInt(this.$.progressInput.getValue() || 0, 10) - 10, 0));
			this.changeProgress();
		},
		sliderChanging: function(inSender, inEvent) {
			this.$.result.setContent(inSender.name + ' changing: ' + Math.round(inEvent.value));
		},
		sliderChanged: function(inSender) {
			this.$.result.setContent(inSender.name + ' changed to ' + Math.round(inSender.getValue()) + '.');
		},
		customChanging: function(inSender, inEvent) {
			this.updateSlider3Popup(inEvent.value);
			this.sliderChanging(inSender, inEvent);
		},
		customChanged: function(inSender, inEvent) {
			this.updateSlider3Popup(inSender.getValue());
			this.sliderChanged(inSender, inEvent);
		},
		customAnimateFinish: function(inSender, inEvent) {
			this.updateSlider3Popup(inEvent.value);
		},
		updateSlider3Popup: function(inValue) {
			var color = 'rgb(0, 0, ' + Math.round(inValue) + ')';
			this.$.slider3.setPopupContent(color);
			this.$.slider3.setPopupColor(color);
		},
		changeLockbar: function() {
			var ck = this.$.lockBarSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setLockBar(ck);
				}
			}
			return true;
		},
		animateActivate: function() {
			var ck = this.$.animateSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setAnimate(ck);
				}
			}
			return true;
		},
		changeStatusBubble: function() {
			var ck = this.$.noPopupSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setNoPopup(ck);
				}
			}
			return true;
		},
		changeTapable: function() {
			var ck = this.$.tapableSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setTappable(ck);
				}
			}
			return true;
		},
		changeConstrain: function() {
			var ck = this.$.constrainSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setConstrainToBgProgress(ck);
				}
			}
			return true;
		},
		changeElastic: function() {
			var ck = this.$.elasticSetting.getChecked();

			for (var i in this.$) {
				if (this.$[i].kind == Slider) {
					this.$[i].setElasticEffect(ck);
				}
			}
			return true;
		},
		changePercentage: function() {
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
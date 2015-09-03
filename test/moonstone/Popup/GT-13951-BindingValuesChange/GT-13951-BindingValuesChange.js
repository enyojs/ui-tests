var
	kind = require('enyo/kind');

var
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	RadioItem = require('moonstone/RadioItem'),
	RadioItemGroup = require('moonstone/RadioItemGroup'),
	ToggleButton = require('moonstone/ToggleButton'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-13951-BindingValuesChange',
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: ContextualPopupDecorator, style:'position: absolute; right: 0px; top: 13%;', components: [
				{content:'Nested Radio', small:true},
					{name:'nestedRadioPopup', kind: ContextualPopup, components:[
						{name:'nestedRadioGroup', kind: RadioItemGroup, components: [
							{content: 'Creek', selected: true},
							{content: 'River'},
							{content: 'Ocean'}
						]},
						{components:[
							{content: 'Radio Group Value'},
							{name: 'nestedRadioValue'}
						]},
						{name: 'nestedRadioDismissButton',
						 kind: ToggleButton,
						 style:'margin-top:5px',
						 small: true,
						 toggleOnLabel: 'select dismiss on',
						 toggleOffLabel: 'select dismiss off'
						}
					]}
				]
			}
		],
		bindings: [
			{from: '.$.nestedRadioGroup.active.content', to: '.$.nestedRadioValue.content', transform: function(val){
				this.dismissRadioSelection();
				return val;
			}}
		],
		buttonToggled: function(inSender) {
			this.$.buttonPopup.setSpotlightModal(inSender.getActive());
			this.$.buttonPopup.setAutoDismiss(!inSender.getActive());
		},
		dismissRadioSelection: function(){
			if(this.$.nestedRadioDismissButton.value) {
				this.$.nestedRadioPopup.hide();
			}
		},
		setPosition: function(){
			this.$.directionButton.applyStyle('left', this.$.leftInput.getValue() === '' ? '40%' : this.$.leftInput.getValue());
			this.$.directionButton.applyStyle('top', this.$.topInput.getValue() === '' ? '70%' : this.$.topInput.getValue());
		},
		groupChanged: function(inSender, inEvent) {
			if(inEvent.originator.getActive() && inEvent.originator.kind === RadioItem) {
				var selected = inEvent.originator.getContent();
				this.$.directionContext.set('direction', selected);
			}
		}
	});
load(Test);
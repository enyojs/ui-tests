var
	kind = require('enyo/kind');

var
	Accordion = require('moonstone/Accordion'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	DatePicker = require('moonstone/DatePicker'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),	
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller'),
	SelectableItem = require('moonstone/SelectableItem'),
	SimplePicker = require('moonstone/SimplePicker'),
	TimePicker = require('moonstone/TimePicker'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-18095-ScrollThumbDisplaysTopBottom',
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Panel, classes: 'enyo-fit', headerType: 'medium', title: 'Vertical Scroller', headerComponents: [
				{content: 'Spacing: ', classes: 'moon-header-client-text'},
				{kind: SimplePicker, name: 'spacingPicker', classes: 'moon-4h', onChange: 'spacingChanged', components: [
					{content: 'default', spacingClass: ''},
					{content: 'small', spacingClass: 'moon-vspacing-s', active:true},
					{content: 'medium', spacingClass: 'moon-vspacing-m'},
					{content: 'large', spacingClass: 'moon-vspacing-l'}
				]}
			], components: [
				{ kind: Scroller, classes: 'enyo-fill', components: [
					{name: 'wrapper', classes: 'moon-6h moon-vspacing-s', components: [
						{kind: ExpandablePicker, noneText: 'Select a language', autoCollapse: true, content: 'Expandable Picker', classes: 'moon-expandable-picker-wrapper', components: [
							{content: 'English'},
							{content: 'Spanish'},
							{content: 'French'},
							{content: 'German'},
							{content: 'Italian'},
							{content: 'Japanese'}
						]},
						{kind: ExpandableInput, content: 'Expandable Input', noneText: 'No Input'},
						{kind: ExpandableIntegerPicker, content: 'Expandable Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'},
						{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
						{kind: TimePicker, noneText: 'Pick a Time', content: 'Time Picker'},
						{kind: CheckboxItem, content: 'Checkbox Item 1'},
						{kind: CheckboxItem, content: 'Checkbox Item 2'},
						{kind: CheckboxItem, content: 'Checkbox Item 3'},
						{kind: SelectableItem, content: 'Selectable Item 1'},
						{kind: SelectableItem, content: 'Selectable Item 2'},
						{kind: SelectableItem, content: 'Selectable Item 3'},
						{kind: CheckboxItem, content: 'Checkbox Item 4 (right)', checkboxOnRight:true},
						{kind: CheckboxItem, content: 'Checkbox Item 5 (right)', checkboxOnRight:true},
						{kind: CheckboxItem, content: 'Checkbox Item 6 (right)', checkboxOnRight:true},				
						{kind: InputDecorator, components: [
							{kind: Input, placeholder: 'Input'}
						]},
						{kind: InputDecorator, components: [
							{kind: Input, placeholder: 'Input'}
						]},
						{kind: InputDecorator, components: [
							{kind: Input, placeholder: 'Input'}
						]},
						{kind: Accordion, content: 'Accordion 1', defaultKind: SelectableItem, components: [
							{content: 'Item One'},
							{content: 'Item Two'}
						]},
						{kind: Accordion, content: 'Accordion 2', defaultKind: SelectableItem, components: [
							{content: 'Item Three'},
							{content: 'Item Four'}
						]},
						{kind: Accordion, content: 'Accordion 3', defaultKind: SelectableItem, components: [
							{content: 'Item Five'},
							{content: 'Item Six'}
						]}						
					]}
				]}
			]}
		],
		create: function() {
			this.inherited(arguments);
			this.spacingChanged();
		},
		spacingChanged: function() {
			if (this.lastSpacingClass) {
				this.$.wrapper.removeClass(this.lastSpacingClass);
			}
			var c = this.$.spacingPicker.getSelected().spacingClass;
			this.$.wrapper.addClass(c);
			this.lastSpacingClass = c;
		}
	});

load(Test);
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	DatePicker = require('moonstone/DatePicker'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker');

var
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-18154-FocusSpotsOnParentOnCollapse',
		kind: Control,
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Panels, pattern: 'activity', classes: 'enyo-fit', components: [
				{kind: Panel, name: 'nonGroupedPanel', onChange: 'pickerChanged', title: 'Expandable', headerType: 'medium', titleBelow: 'Not grouped', style: 'width:50%;', components: [
					{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
						{style: 'max-width: 500px;', components: [
							{kind: ExpandableIntegerPicker, autoCollapse: true, content: 'Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'}
						]}
					]}
				]}
			]}
		],
		create: function () {
			Control.prototype.create.apply(this, arguments);
		},
		pickerChanged: function (sender, event) {
			var value,
				picker = event.originator.getContent();
			if (event.originator instanceof ExpandablePicker) {
				value = event.content;
				sender.setSubTitleBelow(picker + ' changed to \'' + value + '\'');
			} else if ((event.originator instanceof ExpandableIntegerPicker) ||
						(event.originator instanceof DatePicker) ||
						(event.originator instanceof TimePicker) ||
						(event.originator instanceof ExpandableInput)) {
				value = event.originator.getValue();
				sender.setSubTitleBelow(picker + ' changed to \'' + value + '\'');
			}
		}
	});
load(Test);
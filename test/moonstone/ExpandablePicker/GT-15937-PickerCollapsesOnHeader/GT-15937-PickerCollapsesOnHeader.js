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
	TimePicker = require('moonstone/TimePicker'),
	DayPicker = require('moonstone/DayPicker'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-15937-PickerCollapsesOnHeader',
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Panels, pattern: 'activity', classes: 'enyo-fit', components: [
				{kind: Panel, name: 'nonGroupedPanel', onChange: 'pickerChanged', title: 'Expandable', headerType: 'medium', titleBelow: 'Not grouped', style: 'width:50%;', components: [
					{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
						{style: 'max-width: 500px;', components: [
							{kind: DayPicker, noneText: 'Pick a Day', content: 'Day Picker'}
						]}
					]}
				]},
			]}
		],
		create: function () {
			Control.prototype.create.apply(this, arguments);
		},
		pickerChanged: function(inSender, inEvent) {
			var value,
				picker = inEvent.originator.getContent();
			if (inEvent.originator instanceof ExpandablePicker) {
				value = inEvent.content;
				inSender.setSubTitleBelow(picker + ' changed to ' + value + '');
			} else if ((inEvent.originator instanceof ExpandableIntegerPicker) ||
						(inEvent.originator instanceof DatePicker) ||
						(inEvent.originator instanceof TimePicker) ||
						(inEvent.originator instanceof ExpandableInput)) {
				value = inEvent.originator.getValue();
				inSender.setSubTitleBelow(picker + ' changed to ' + value + '');
			}
		},
		// when called, go into loop of opening/closing pickers every second
		stressTest: function() {
			var pickers = [
				'datePicker',
				'datePicker2',
				'expandableInput',
				'expandableInput2',
				'expandableIntegerPicker',
				// disabled 'expandableIntegerPicker2',
				'expandableIntegerPicker3',
				// disabled 'expandableIntegerPicker4',
				'expandablePicker',
				'expandablePicker2',
				'expandablePicker3',
				'expandablePicker4',
				// disabled 'expandablePicker5',
				'expandablePicker6',
				'expandablePicker7',
				'expandablePicker8',
				'expandablePicker9',
				'expandablePicker10',
				// disabled 'expandablePicker11',
				'expandablePicker12',
				'timePicker',
				'timePicker2',
				'expandableDataPicker',
				'expandableDataPicker2'
			];
			var index = 0;
			var opened = false;
			setInterval(this.bindSafely(function() {
				if (opened) {
					this.$[pickers[index++]].setOpen(false);
				} else {
					this.$[pickers[index]].setOpen(true);
				}
				opened = !opened;
				index = index % pickers.length;
			}), 1000);
		}
	});
load(Test);
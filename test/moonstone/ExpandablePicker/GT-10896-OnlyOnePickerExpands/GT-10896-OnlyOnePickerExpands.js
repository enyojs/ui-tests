var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

var
	DatePicker = require('moonstone/DatePicker'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker'),
	load = require('../../../load'),
	Test = kind({
		name: 'test.GT-10896-OnlyOnePickerExpands',
		kind: Control,
		classes: 'moon enyo-unselectable enyo-fit',
		components: [
			{kind: Panels, pattern: 'activity', classes: 'enyo-fit', components: [
				{kind: Panel, name: 'groupedPanel', onChange: 'pickerChanged', title: 'Pickers', headerType: 'medium', titleBelow: 'Grouped', joinToPrev:true, components: [
					{kind: Group, tag:null, highlander: true, components: [
						{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
							{style: 'max-width: 500px;', components: [
								{kind: ExpandablePicker, noneText: 'Nothing selected', content: 'Expandable Picker', allowHtml:true, components: [
									{content: 'English'},
									{content: 'Spanish'},
									{content: 'French'},
									{content: 'German'},
									{content: 'Italian'},
									{content: 'Japanese'},
									{content: 'Symbols <span style=\'color:orange;\'>&#x2620; &#x2764; &#x2619;</span>', allowHtml:true}
								]},
								{kind: ExpandablePicker, content: 'Pre-selected Picker', components: [
									{content: 'On', active: true},
									{content: 'Off'}
								]}
							]}
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
		},
		// when called, go into loop of opening/closing pickers every second
		stressTest: function () {
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
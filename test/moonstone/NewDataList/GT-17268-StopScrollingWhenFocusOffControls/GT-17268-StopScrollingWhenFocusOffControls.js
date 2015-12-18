var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection');

var
	GridListImageItem = require('moonstone/GridListImageItem'),
	Button = require('moonstone/Button'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	NewDataList = require('moonstone/NewDataList'),
	Overlay = require('moonstone/Overlay'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller');

var ImageItem = kind({
	kind: GridListImageItem,
	subCaption: 'Sub Caption',
	mixins: [Overlay.Selection],
	bindings: [
		{from: 'model.text', to: 'caption'},
		{from: 'model.subText', to: 'subCaption'},
		{from: 'model.url', to: 'source'}
	]
});

var
	imageComponents = [
		{kind: ImageItem, style: 'position: absolute;'}
	];

function selectedValue (selected) {
	return selected && selected.value;
}

var
	load = require('../../../load'),
	Test = kind({
			name: 'test.GT-17268-StopScrollingWhenFocusOffControls',
		kind: Panels,
		pattern: 'activity',
		classes: 'moon enyo-fit enyo-unselectable',
		components: [
			{
				kind: Panel,
				classes:'moon-6h',
				title:'Menu',
				components: [
					{
						kind: Scroller,
						components: [
							{
								name: 'directionPicker',
								kind: ExpandablePicker,
								content: 'Direction',
								components: [
									{content: 'Vertical', value: 'vertical', active: true},
									{content: 'Horizontal', value: 'horizontal'}
								]
							},
						]
					}
				]
			},
			{
				kind: Panel,
				joinToPrev: true,
				title:'New Data List',
				headerComponents: [
					{kind: Button, content:'Refresh', ontap:'refreshItems'}
				],
				components: [
					{
						name: 'list',
						kind: NewDataList,
						minItemHeight: 270,
						minItemWidth: 180,
						spacing: 20,
						columns: 6,
						rows: 1,
						components: imageComponents
					}
				]
			}
		],
		bindings: [
			{from: 'collection', to: '$.list.collection'},
			{from: '$.itemPicker.selected', to: '$.list.components', transform: selectedValue},
			{from: '$.directionPicker.selected', to: '$.list.direction', transform: selectedValue},
			{from: '$.dataTypePicker.selected', to: 'dataType', transform: selectedValue},
			{from: '$.selectionPicker.selected', to: '$.list.selection', transform: selectedValue},
			{from: '$.selectionPicker.selected', to: '$.selectionTypePicker.showing', transform: selectedValue},
			{from: '$.selectionTypePicker.selected', to: '$.list.selectionType', transform: selectedValue}
		],
		create: function () {
			Panels.prototype.create.apply(this, arguments);
			this.refreshItems(500);
		},
		generateRecords: function () {
			var records = [],
				idx     = this.modelIndex || 0,
				title, subTitle, color;
			for (; records.length < 500; ++idx) {
				title = (idx % 8 === 0) ? ' with long title' : '';
				subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
				color = Math.floor((Math.random()*(0x1000000-0x101010))+0x101010).toString(16);

				records.push({
					selected: false,
					text: 'Item ' + idx + title,
					subText: subTitle,
					// url: 'http://placehold.it/300x300/9037ab/ffffff&text=Image'
					url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx,
					bgColor: '#' + color
				});
			}
			// update our internal index so it will always generate unique values
			this.modelIndex = idx;
			return records;
		},
		refreshItems: function (num) {
			var data;

			num = (typeof num === 'number') ? num : 100;
			data = this.generateRecords(num);

			if (this.collection && this.collection.destroy) {
				this.collection.destroy();
			}
			this.set('collection', this.dataType === 'JS' ? data : new Collection(data));
		},
		dataTypeChanged: function (prev) {
			if (prev) {
				this.refreshItems(500);
			}
		}
	});

load(Test);
var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandableDataPicker/GT-14230-VisibleCheckmarksMultipleSelection',
	title = 'GT-14230 - ExpandableDataPicker: Visible Check Marks display in Multiple Selection',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ExpandableDataPicker'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should check items when clicked' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.autoCollapseInput)
			.click()
			.getAttribute('checked').should.eventually.be.not.ok
			.elementById(app.multiSelectionInput)
			.click()
			.getAttribute('checked').should.eventually.be.ok
			.elementById(app.picker)
			.click()
			.delay(1000)
			.getClasses().should.eventually.contain('open')
			.elementById(app.firstItem)
			.click()
			.getAttribute('checked').should.eventually.be.ok
			.elementById(app.firstItemCheck)
			.getComputedCss('opacity').should.eventually.contain('1')
			.elementById(app.firstItemCheck)
			.getComputedCss('color').should.eventually.contain(app.whiteColor)
			.elementById(app.secondItem)
			.click()
			.getAttribute('checked').should.eventually.be.ok
			.elementById(app.secondItemCheck)
			.getComputedCss('opacity').should.eventually.contain('1')
			.elementById(app.secondItemCheck)
			.getComputedCss('color').should.eventually.contain(app.whiteColor)
			.elementById(app.thirdItem)
			.click()
			.getAttribute('checked').should.eventually.be.ok
			.elementById(app.thirdItemCheck)
			.getComputedCss('opacity').should.eventually.contain('1')
			.elementById(app.thirdItemCheck)
			.getComputedCss('color').should.eventually.contain(app.whiteColor)
			.elementById(app.firstItem)
			.click()
			.getAttribute('checked').should.eventually.be.not.ok
			.elementById(app.firstItemCheck)
			.getComputedCss('opacity').should.eventually.contain('0.3')
			.elementById(app.secondItem)
			.click()
			.getAttribute('checked').should.eventually.be.not.ok
			.elementById(app.secondItemCheck)
			.getComputedCss('opacity').should.eventually.contain('0.3')
			.elementById(app.thirdItem)
			.click()
			.getAttribute('checked').should.eventually.be.not.ok
			.elementById(app.thirdItemCheck)
			.delay(1000)
			.getComputedCss('opacity').should.eventually.contain('0.3')
			.nodeify(done);
	});

});

app = {
	multiSelectionInput: 'gT-14230-VisibleCheckmarksMultipleSelection_formCheckbox_input',
	autoCollapseInput: 'gT-14230-VisibleCheckmarksMultipleSelection_formCheckbox2_input',
	firstItem: 'gT-14230-VisibleCheckmarksMultipleSelection_picker_checkboxItem4_input',
	secondItem: 'gT-14230-VisibleCheckmarksMultipleSelection_picker_checkboxItem5_input',
	thirdItem: 'gT-14230-VisibleCheckmarksMultipleSelection_picker_checkboxItem6_input',
	firstItemCheck: 'gT-14230-VisibleCheckmarksMultipleSelection_picker_checkboxItem4_input_checkboxIcon',
	secondItemCheck: 'gT-14230-VisibleCheckmarksMultipleSelection_picker_checkboxItem5_input_checkboxIcon',
	thirdItemCheck: 'gT-14230-VisibleCheckmarksMultipleSelection_picker_checkboxItem6_input_checkboxIcon',
	picker: 'gT-14230-VisibleCheckmarksMultipleSelection_picker',
	whiteColor: '255, 255, 255',
};

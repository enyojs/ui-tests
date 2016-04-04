var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-10896-OnlyOnePickerExpands',
	title = 'GT-10896 - ExpandablePicker: One Picker Stays Expanded in Grouped Pickers',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ExpandablePicker'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path, function(){
			browser = helpers.initBrowser(title, tags, base, path, done);
		});
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should have only one picker open at a time' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.expandablePicker)
			.click()
			.delay(1000)
			.elementById(app.expandablePicker)
			.getClasses().should.eventually.contain('open')
			.elementById(app.nonAutoCollapsingPicker)
			.click()
			.delay(1000)
			.elementById(app.nonAutoCollapsingPicker)
			.getClasses().should.eventually.contain('open')
			.elementById(app.expandablePicker)
			.getClasses().should.eventually.not.contain('open')
			.nodeify(done);
	});

});

app = {
	expandablePicker: 'gT-10896-OnlyOnePickerExpands_expandablePicker',
	nonAutoCollapsingPicker: 'gT-10896-OnlyOnePickerExpands_expandablePicker2'
};

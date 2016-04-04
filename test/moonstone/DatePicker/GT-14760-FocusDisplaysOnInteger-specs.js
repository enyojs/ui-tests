var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-14760-FocusDisplaysOnInteger',
	title = 'GT-14760 - DatePicker: Focus displays the integer pickers on upon 5way',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','5way','DatePicker'];	// Tags show up in SauceLabs test output

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

	it('should have spotlight on month when picker opens on 5way' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.picker)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.pickerHeader)			
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.monthPicker)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	picker: 'gT-14760-FocusDisplaysOnInteger_picker',
	pickerHeader: 'gT-14760-FocusDisplaysOnInteger_picker_header',
	monthPicker: 'gT-14760-FocusDisplaysOnInteger_picker_month'
};
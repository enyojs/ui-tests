var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

	// This URL allows us to specify the locale when loading a sample
var base = 'http://localhost:3000/',
	path = 'test/moonstone/Header/GT-13913-DirectionString',
	title = 'GT-13913 - Header RTL LTR String',	// Title shows up in test output
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'RTL','QA'];	// Tags show up in SauceLabs test output

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

	it('Should move sub header in Right-to-Left mode', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			// Wait for the app to load and render our element
			.waitForElementById(app.appID)
			.scrollIntoView()
			// When in RTL mode, LTR content should appear to the left
			.elementById(app.SmallHeaderTitleId)
			.getAttribute('style').should.eventually.contain('direction: ltr')
			// Enable RTL content
			.elementById(app.RTLButtonId)
			.click()
			.elementById(app.SmallHeaderTitleId)
			// When in RTL mode, RTL content should appear to the right
			.getAttribute('style').should.eventually.contain('direction: rtl')
			.nodeify(done);
	});

});

app = {
	appID: 'gT-13913-DirectionString',
	SmallHeaderTitleId: 'gT-13913-DirectionString_smallHeader_title',
	RTLButtonId: 'gT-13913-DirectionString_button7_client'
};
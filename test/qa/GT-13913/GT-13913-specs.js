var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

	// This URL allows us to specify the locale when loading a sample
var url = 'http://localhost:3000/lib/moonstone/samples/Sample.html?All#HeaderSample/ur-PK',
	title = 'GT-13913 Header RTL LTR String',	// Title shows up in test output
	tags = ['moonstone', 'RTL','QA'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("Should enable paging controls when available to scroll", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			// Wait for the app to load and render our element
			.waitForElementById(app.SmallHeaderTitleId)
				// When in RTL mode, LTR content should appear to the left
				.getAttribute('innerHTML').should.eventually.match(/^<span/, "Sub Header to the left")
			.elementById(app.RTLButtonId)
				.click()					// Enable RTL content

			.elementById(app.SmallHeaderTitleId)
				// When in RTL mode, RTL content should appear to the right
				.getAttribute('innerHTML').should.eventually.match(/<\/span>$/, "Sub Header to the right")
			.nodeify(done);
	});

});

app = {
	SmallHeaderTitleId: 'app_sample_smallHeader_title',
	RTLButtonId: 'app_sample_button7'
};

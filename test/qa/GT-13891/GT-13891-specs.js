var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var url = 'http://localhost:3000/lib/moonstone/samples/PopupSample.html',
	title = 'GT-13891 5-way Select Unspottable Popup',
	tags = ['moonstone', 'spotlight','QA'];	// Tags show up in SauceLabs test output

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
			.waitForElementById(app.BasicPopupButtonId)
			.keys(helpers.wd.SPECIAL_KEYS['Up arrow'])
			.keys(helpers.wd.SPECIAL_KEYS['Enter'])
			.elementById(app.PopupId)
				.getClasses().should.eventually.contain('showing', 'popup showing')
			.keys(helpers.wd.SPECIAL_KEYS['Enter'])
			.elementById(app.PopupId)
				.getClasses().should.eventually.contain('showing', 'popup still showing')
			.nodeify(done);
	});

});

app = {
	BasicPopupButtonId: 'popupSample_button',
	PopupId: 'popupSample_basicPopup'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Button/GT-11181-ButtonFocusState',
	title = 'Button: "Selected + Focus" State displays after pointer timeout',
	tags = ['moonstone', 'qa', 'button'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

  it("should maintain selected and focus state after pointer times out", function (done) {
    browser
      .setWindowSize(1920,1280)
      .get(url)
      .waitForElementById(app.buttonId)
      .elementById(app.buttonId)
      .click()
      .sleep(5000)
      .waitForElementById(app.buttonId,1000)
      .getClasses().should.eventually.contain('active','spotlight')
      .nodeify(done);
  });

});

app = {
	buttonId: 'app_appleButton',
};

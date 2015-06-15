var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/ProgressBar/GT-11138-ProgressButtonDigitAnimation',
	title = 'ProgressButton: Digits animates up/downward in Simple Progress Button',
	tags = ['sample'];	// Tags show up in SauceLabs test output

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

	it("should animate in an upward count", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.numberInputID)
			.elementById(app.numberInputID)
			.execute('enyo.$["app_input"].set("value", 10)')
			.execute('enyo.$["app_progressButton_bar"].set("style", "transform: translateX(-80%); -webkit-transform: translateX(-80%);")')
			.enyoPropertyGet(app.progressBar, 'style').should.eventually.equal("transform: translateX(-80%); -webkit-transform: translateX(-80%);")
			.elementById(app.setButton)
			.click()
			.waitForElementById(app.progressBar)
			.execute('enyo.$["app_input"].set("value", 99)')
			.elementById(app.setButton)
			.click()

			//Works on webOS, not working in chrome
			//confirms that upward animation works
			.enyoPropertyGet(app.progressBar, 'style').should.eventually.equal("transform: translateX(-15%); -webkit-transform: translateX(-15%);")

			//TODO: Work on timeout in browser so animation goes all the way down during test.
			.nodeify(done);
	});

  it("should animate in an downward count", function (done) {
    browser
      .setWindowSize(1920,1280)
      .get(url)
      .waitForElementById(app.numberInputID)
      .elementById(app.numberInputID)
      .execute('enyo.$["app_input"].set("value", 99)')
			.execute('enyo.$["app_progressButton_bar"].set("style", "transform: translateX(-15%); -webkit-transform: translateX(-15%);")')
			.enyoPropertyGet(app.progressBar, 'style').should.eventually.equal("transform: translateX(-15%); -webkit-transform: translateX(-15%);")
      .elementById(app.setButton)
      .click()
			.waitForElementById(app.progressBar)
      .execute('enyo.$["app_input"].set("value", 10)')
			.elementById(app.setButton)
      .click()

			//Works on webOS, not working in chrome
			//confirms that downward animation works
			.enyoPropertyGet(app.progressBar, 'style').should.eventually.equal("transform: translateX(-80%); -webkit-transform: translateX(-80%);")

			//TODO: Work on timeout in browser so animation goes all the way down during test.
      .nodeify(done);
  });

});

app = {
  progressBar: "app_progressButton_bar",
  numberInputID: "app_input",
  setButton: "app_button_tapArea"

	// Test-specific constants can be placed here
};

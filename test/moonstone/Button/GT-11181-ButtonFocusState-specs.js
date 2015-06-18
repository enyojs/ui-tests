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
      //click button
      .waitForElementById(app.buttonId)
      .click()
      //check to see active + spotlight state
      .waitForElementById(app.buttonId,1000)
      .getClasses().should.eventually.contain('active')
      .waitForElementById(app.buttonId,1000)
      .getClasses().should.eventually.contain('spotlight')

      //move cursor off
      .waitForElementById(app.appDivider)
      .moveTo()
      .sleep(1000)

      //check to make sure focus is off but selected is on
      .waitForElementById(app.buttonId)
      .getClasses().should.eventually.contain('active')
      .waitForElementById(app.buttonId)
      .getClasses().should.eventually.not.contain('spotlight')
      .elementById(app.buttonId)
      .moveTo()
      //wait for cursor to disappear
      .sleep(10000)
      .waitForElementById(app.buttonId,1000)
      .getClasses().should.eventually.contain('spotlight')
      .nodeify(done);
  });

});

app = {
	buttonId: 'app_appleButton',
  appDivider: 'app_divider'
};

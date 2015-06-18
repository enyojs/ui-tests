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
      .waitForElementById(app.appleButtonID)
      .click()
      .delay(1000)
      //check to see active + spotlight state
      .waitForElementById(app.appleButtonID,1000)
      .getClasses().should.eventually.contain('active')
      .waitForElementById(app.appleButtonID,1000)
      .getClasses().should.eventually.contain('spotlight')

      //move cursor off button
      .waitForElementById(app.appDivider)
      .moveTo()
      .delay(2000)

      //check to make sure focus is off but selected is on
      .waitForElementById(app.appleButtonID)
      .getClasses().should.eventually.contain('active')
      .waitForElementById(app.appleButtonID)
      .getClasses().should.eventually.not.contain('spotlight')
      .elementById(app.appleButtonID)
      .moveTo()

      //wait for cursor to disappear
      .delay(10000)
      .waitForElementById(app.appleButtonID,1000)
      .getClasses().should.eventually.contain('spotlight')
      .nodeify(done);
  });

});

app = {
	appleButtonID: 'app_appleButton',
  bananaButtonID: 'app_bananaButton',
  appDivider: 'app_divider'
};

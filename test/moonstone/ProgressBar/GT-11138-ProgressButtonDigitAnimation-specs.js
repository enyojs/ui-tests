var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/ProgressBar/GT-11138-ProgressButtonDigitAnimation',
	title = 'ProgressButton: Digits animates up/downward in Simple Progress Button',
	tags = ['sample', 'Progess Button', 'Animation'];	// Tags show up in SauceLabs test output

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

	it("should animate digits in an upward count", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.numberInputID)
			.enyoPropertySet(app.numberInputID, "value", app.lowNumber)
			.elementById(app.setButton)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.progressBarDigit, 'content').should.eventually.equal("9%")
			.enyoPropertySet(app.numberInputID, "value", app.highNumber)
			.elementById(app.setButton)
			.click()
			.delay(100)
			.elementById(app.progressBarDigit)
			.parseInt().should.eventually.within(app.lowNumber, app.highNumber)
  			.elementById(app.progressBarDigit)
			.delay(500)
			.enyoPropertyGet(app.progressBarDigit, 'content').should.eventually.equal("99%")
			.nodeify(done);
	});

  	it("should animate digits in an downward count", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.numberInputID)
			.enyoPropertySet(app.numberInputID, "value", app.highNumber)
			.elementById(app.setButton)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.progressBarDigit, 'content').should.eventually.equal("99%")
			.enyoPropertySet(app.numberInputID, "value", app.lowNumber)
			.elementById(app.setButton)
			.click()
			.delay(100)
			.elementById(app.progressBarDigit)
			.parseInt().should.eventually.within(app.lowNumber, app.highNumber)
  			.elementById(app.progressBarDigit)
			.delay(500)
			.enyoPropertyGet(app.progressBarDigit, 'content').should.eventually.equal("9%")
			.nodeify(done);
  	});
});

app = {
	progressBarDigit: "app_progressButton_progressPercent",
	numberInputID: "app_input",
	setButton: "app_button_tapArea",
	highNumber: 99,
	lowNumber: 9
};
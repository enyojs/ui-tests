var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ProgressBar/GT-11138-ProgressButtonDigitAnimation',
	title = 'GT-11138 - ProgressButton: Digits animates up/downward in Simple Progress Button',
	directory = 'ui-tests/dist',
	tags = ['sample', 'Progess Button', 'Animation'];	// Tags show up in SauceLabs test output

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

	it("should animate digits in an upward count", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
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
			//check to see if animating number is in between high and low number
			.textAsInt().should.be.eventually.within(app.lowNumber, app.highNumber)
			.elementById(app.progressBarDigit)
			.delay(500)
			.enyoPropertyGet(app.progressBarDigit, 'content').should.eventually.equal("99%")
			.nodeify(done);
	});

	it("should animate digits in an downward count", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
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
			//check to see if animating number is in between high and low number
			.textAsInt().should.be.eventually.within(app.lowNumber, app.highNumber)
  			.elementById(app.progressBarDigit)
			.delay(500)
			.enyoPropertyGet(app.progressBarDigit, 'content').should.eventually.equal("9%")
			.nodeify(done);
  	});
});

app = {
	progressBarDigit: "gT-11138-ProgressButtonDigitAnimation_progressButton_progressPercent",
	numberInputID: "gT-11138-ProgressButtonDigitAnimation_input",
	setButton: "gT-11138-ProgressButtonDigitAnimation_button_client",
	highNumber: 99,
	lowNumber: 9
};

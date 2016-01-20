var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/TimePicker/GT-11132-Reset',
	title = 'GT-11132 - Time Picker: Reset Time',
	tags = ['moonstone', 'qa', 'TimePicker','P2'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should clear time when time set to null', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get('ui-tests/dist')
			.waitForElementById(app.pickerID)
			.enyoPropertyGet(app.pickerID, 'value').should.eventually.equal(null, 'starts empty')
			.elementById(app.pickerID)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.pickerID, 'value').should.eventually.not.equal(null, 'filled on selection')
			.elementById(app.resetID)
			.click()
			.delay(100)
			.enyoPropertyGet(app.pickerID, 'value').should.eventually.equal(null, 'cleared on reset')
			.enyoPropertyGet(app.pickerID, 'open').should.eventually.equal(false, 'closed on reset')
			.nodeify(done);
	});

});

app = {
	pickerID: 'gT-11132-Reset_pickerTime',
	resetID: 'gT-11132-Reset_buttonReset'
};


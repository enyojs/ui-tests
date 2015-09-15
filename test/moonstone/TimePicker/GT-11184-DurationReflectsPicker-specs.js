var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/TimePicker/GT-11184-DurationReflectsPicker',
	title = 'TimePicker: Duration picker reflects current changes',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'TimePicker', 'qa'];	// Tags show up in SauceLabs test output

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

	it('Should have timepicker match time display', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.timePickerID)
			.click()
			.delay(500)
			//check default time
			.elementById(app.currentTime)
			.text().should.eventually.equal('1:50pm')
			.elementById(app.hourUpArrowID)
			.click()
			.click()
			//need to add this moveTo to force the focus elsewhere. without this move focus messes up helper
			.elementById(app.appId)
			.moveTo()
			//check displayed time equals pickers
			//enyoPropertyGet looks for the last element with the Id name	
			.elementById(app.hourText)
			.getTopElementText().should.eventually.equal('3')
			.elementById(app.minuteText)
			.getTopElementText().should.eventually.equal('50')
			.elementById(app.meridiemText)
			.getTopElementText().should.eventually.equal('pm')
			.elementById(app.currentTime)
			.text().should.eventually.equal('3:50pm')
			.elementById(app.minuteUpArrowID)
			.click()
			.click()
			.elementById(app.appId)
			.moveTo()
			.elementById(app.hourText)
			.getTopElementText().should.eventually.equal('3')
			.elementById(app.minuteText)
			.getTopElementText().should.eventually.equal('52')
			.elementById(app.meridiemText)
			.getTopElementText().should.eventually.equal('pm')
			.elementById(app.currentTime)
			.text().should.eventually.equal('3:52pm')
			.elementById(app.meridiemUpArrowID)
			.click()
			.elementById(app.appId)
			.moveTo()
			.elementById(app.hourText)
			.getTopElementText().should.eventually.equal('3')
			.elementById(app.minuteText)
			.getTopElementText().should.eventually.equal('52')
			.elementById(app.meridiemText)
			.getTopElementText().should.eventually.equal('am')
			.elementById(app.currentTime)
			.text().should.eventually.equal('3:52am')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-11184-DurationReflectsPicker',
	timePickerID: 'gT-11184-DurationReflectsPicker_control',
	hourUpArrowID: 'gT-11184-DurationReflectsPicker_pickerTime_hour_nextOverlay',
	minuteUpArrowID: 'gT-11184-DurationReflectsPicker_pickerTime_minute_nextOverlay',
	meridiemUpArrowID: 'gT-11184-DurationReflectsPicker_pickerTime_meridiem_control2',
	hourText: 'gT-11184-DurationReflectsPicker_pickerTime_hour_scroller_strategy_client',
	minuteText: 'gT-11184-DurationReflectsPicker_pickerTime_minute_scroller_strategy_client',
	meridiemText: 'gT-11184-DurationReflectsPicker_pickerTime_meridiem_scroller_strategy_client',
	currentTime: 'gT-11184-DurationReflectsPicker_pickerTime_header_text',
};
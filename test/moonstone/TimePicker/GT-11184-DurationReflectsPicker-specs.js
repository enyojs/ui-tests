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
			.waitForElementById(app.hourUpArrowID)
			.click()
			.click()
			//check displayed time equals pickers
			//enyoPropertyGet looks for the last element with the Id name	
			.enyoPropertyGet(app.hourText, 'content').should.eventually.equal('3')
			.elementById(app.minuteText)
			.text().should.eventually.equal('50')
			.elementById(app.meridiemText)
			.text().should.eventually.equal('pm')
			.elementById(app.currentTime)
			.text().should.eventually.equal('3:50pm')
			.elementById(app.minuteUpArrowID)
			.click()
			.click()			
			.enyoPropertyGet(app.hourText, 'content').should.eventually.equal('3')
			.enyoPropertyGet(app.minuteText, 'content').should.eventually.equal('52')
			.elementById(app.meridiemText)
			.text().should.eventually.equal('pm')
			.elementById(app.currentTime)
			.text().should.eventually.equal('3:52pm')
			.elementById(app.meridiemUpArrowID)
			.click()
			.elementById(app.hourText)
			.text().should.eventually.equal('3')
			.enyoPropertyGet(app.minuteText, 'content').should.eventually.equal('52')
			.elementById(app.meridiemText)
			.text().should.eventually.equal('am')
			.elementById(app.currentTime)
			.text().should.eventually.equal('3:52am')
			.nodeify(done);
	});

});

app = {
	timePickerID: 'gT-11184-DurationReflectsPicker_control',
	hourUpArrowID: 'gT-11184-DurationReflectsPicker_pickerTime_hour_nextOverlay',
	minuteUpArrowID: 'gT-11184-DurationReflectsPicker_pickerTime_minute_nextOverlay',
	meridiemUpArrowID: 'gT-11184-DurationReflectsPicker_pickerTime_meridiem_control2',
	hourText: 'gT-11184-DurationReflectsPicker_pickerTime_hour_item',
	minuteText: 'gT-11184-DurationReflectsPicker_pickerTime_minute_item',
	meridiemText: 'gT-11184-DurationReflectsPicker_pickerTime_meridiem_item',
	currentTime: 'gT-11184-DurationReflectsPicker_pickerTime_header_text',
};
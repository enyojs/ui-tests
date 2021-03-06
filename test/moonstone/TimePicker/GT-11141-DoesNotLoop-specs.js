var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/TimePicker/GT-11141-DoesNotLoop',
	title = 'GT-11141 - Time Picker: Does Not Loop',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'TimePicker', 'qa'];	// Tags show up in SauceLabs test output

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

	it('Should not loop hours while the minute picker loops', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.timePickerID)
			.elementById(app.timePickerID)
			.click()
			.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
			.click()
			.execute('dispatcher = enyo.require("enyo/dispatcher"); return dispatcher.$["'+app.appId+'"].get("value").getHours()').should.eventually.equal(3)
			.elementById(app.minuteUpArrowID)
			.click()
			.click()
			.click()
			.execute('dispatcher = enyo.require("enyo/dispatcher"); return dispatcher.$["'+app.appId+'"].get("value").getHours()').should.eventually.equal(3)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-11141-DoesNotLoop',
	timePickerID: 'gT-11141-DoesNotLoop_pickerTimeLinked',
	hourUpArrowID: 'gT-11141-DoesNotLoop_pickerTimeLinked_hour_nextOverlay',
	minuteUpArrowID: 'gT-11141-DoesNotLoop_pickerTimeLinked_minute_nextOverlay'
};


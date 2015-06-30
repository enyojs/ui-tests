var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Drawer/GT-11186-DrawerSelectImage',
	title = 'Drawer: New icon and image displays simultaneously in Drawer Handle',
	tags = ['moonstone', 'qa', 'drawer'];	// Tags show up in SauceLabs test output

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

	it('should change drawer image based on click', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.pickerIcon)
			.click()
			.delay(1000)
			.elementById(app.drawerCheckbox)
			.click()
			.delay(1000)
			.elementById(app.pickerImage)
			.click()
			.delay(1000)
			.elementById(app.htmlCheckbox)
			.click()
			.delay(1000)

	});

});

app = {
	pickerImage: "app_expandablePicker",
	pickerIcon: "app_expandablePicker2",
	drawerCheckbox: "app_checkboxItem6_input",
	htmlCheckbox: "app_checkboxItem3_input",
	drawerIcon: "app_drawers_activatorIcon"
};


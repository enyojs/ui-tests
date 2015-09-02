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
			//check to make sure icon drawer works
			.enyoPropertyGet(app.pickerIconDrawer, 'style').should.eventually.not.contain("display: none;")
			.elementById(app.drawerCheckbox)
			.click()
			.delay(1000)
			.elementById(app.drawerIcon)
			.getClasses().should.eventually.contain('moon-icon-drawer')
			.elementById(app.pickerImage)
			.click()
			.delay(2000)
			//check to make sure picture drawer works
			.enyoPropertyGet(app.pickerImageDrawer, 'style').should.eventually.not.contain("display: none;")
			.elementById(app.htmlCheckbox)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.drawerIcon, 'style').should.eventually.contain(app.html5Image)
			.elementById(app.drawerIcon)
			//check to make sure images don't overlap
			.getClasses().should.not.eventually.contain('moon-icon-drawer')
			.nodeify(done);
	});

});

app = {
	pickerImage: "app_expandablePicker",
	pickerIcon: "app_expandablePicker2",
	drawerCheckbox: "app_checkboxItem6_input",
	htmlCheckbox: "app_checkboxItem3_input",
	drawerIcon: "app_drawers_activatorIcon",
	html5Image: "/lib/moonstone/samples/assets/html5.png);",
	pickerImageDrawer: "app_expandablePicker_drawer_client",
	pickerIconDrawer: "app_expandablePicker2_drawer_client"
};


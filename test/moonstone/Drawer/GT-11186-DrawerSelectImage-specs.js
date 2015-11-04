var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Drawer/GT-11186-DrawerSelectImage',
	title = 'GT-11186 - Drawer: New icon and image displays simultaneously in Drawer Handle',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'drawer'];	// Tags show up in SauceLabs test output

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

	it('should change drawer image based on click', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.pickerIcon)
			.click()
			.delay(1000)
			//check to make sure icon drawer works
			.enyoPropertyGet(app.pickerIconDrawer, 'style').should.eventually.not.contain('display: none;')
			.elementById(app.drawerCheckbox)
			.click()
			// The following click is needed on machines where the screen height doesn't adjust properly
			//  to 1280px. Slow scrolling prevents the click from being recognized as a tap on the control.
			//  This appears to pass on the TV, though it could cause issues down the line. Mostly, it
			//  causes the picker to open again.  Another fix could be to adjust the test to prevent
			//  scrolling caused by the long picker contents.
			.click()
			.delay(1000)
			.elementById(app.drawerIcon)
			.getClasses().should.eventually.contain('moon-icon-drawer')
			.elementById(app.pickerImage)
			.click()
			.delay(2000)
			//check to make sure picture drawer works
			.enyoPropertyGet(app.pickerImageDrawer, 'style').should.eventually.not.contain('display: none;')
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
	pickerImage: 'gT-11186-DrawerSelectImage_expandablePicker',
	pickerIcon: 'gT-11186-DrawerSelectImage_expandablePicker2',
	drawerCheckbox: 'gT-11186-DrawerSelectImage_checkboxItem6_input',
	htmlCheckbox: 'gT-11186-DrawerSelectImage_checkboxItem3_input',
	drawerIcon: 'gT-11186-DrawerSelectImage_drawers_activatorIcon',
	html5Image: 'ui-tests/lib/moonstone/images/html5-icon.png',
	pickerImageDrawer: 'gT-11186-DrawerSelectImage_expandablePicker_drawer_client',
	pickerIconDrawer: 'gT-11186-DrawerSelectImage_expandablePicker2_drawer_client'
};

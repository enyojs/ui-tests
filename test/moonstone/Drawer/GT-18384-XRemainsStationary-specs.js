var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Drawer/GT-18384-XRemainsStationary',
	title = 'GT-18384 - Drawer: X Button Remains Stationary With Partial Drawer',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Drawer'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var parentLocation = 0;
	var buttonLocation = 0;
	var differenceBetweenLocations = 0;

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

	var setParentLocation = function(location){
		parentLocation = parseInt(location.y);
	};

	var setButtonLocation = function(location){
		buttonLocation = parseInt(location.y);
	};

	var setDifferenceBetweenLocations = function(){
		differenceBetweenLocations = buttonLocation - parentLocation;
	};

	var checkIfDifferencesAreEqual = function(){
		var currentDifferenceBetweenLocations = buttonLocation - parentLocation;
		currentDifferenceBetweenLocations.should.equal(differenceBetweenLocations);
	};

	it('should have x remain stationary when drawer is open' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.drawerActivator)
			.click()
			.delay(1000)
			.elementById(app.drawerActivator)
			.getClasses().should.eventually.contain('open')
			.elementById(app.drawersClient)
			.getLocation().then(setParentLocation)
			.elementById(app.xButton)
			.getLocation().then(setButtonLocation).then(setDifferenceBetweenLocations)
			.elementById(app.partialDrawerButton)
			.click()
			.delay(1000)
			.elementById(app.partialDrawer)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.drawersClient)
			.getLocation().then(setParentLocation)
			.elementById(app.xButton)
			.getLocation().then(setButtonLocation).then(checkIfDifferencesAreEqual)
			.elementById(app.openMoreButton)
			.click()
			.delay(2000)
			.elementById(app.drawersClient)
			.getLocation().then(setParentLocation)
			.elementById(app.xButton)
			.getLocation().then(setButtonLocation).then(checkIfDifferencesAreEqual)
			.elementById(app.closeButton)
			.click()
			.delay(1000)
			.elementById(app.drawerActivator)
			.getClasses().should.eventually.contain('open')
			.nodeify(done);
	});
});

app = {
	drawerActivator: 'gT-18384-XRemainsStationary_drawers_activator',
	partialDrawerButton:'gT-18384-XRemainsStationary_drawers_handleButton',
	partialDrawer: 'gT-18384-XRemainsStationary_partialDrawer',
	openMoreButton: 'gT-18384-XRemainsStationary_openMoreButton',
	xButton: 'gT-18384-XRemainsStationary_panels_appClose',
	closeButton: 'gT-18384-XRemainsStationary_button_client',
	drawersClient: 'gT-18384-XRemainsStationary_drawers_client'
};

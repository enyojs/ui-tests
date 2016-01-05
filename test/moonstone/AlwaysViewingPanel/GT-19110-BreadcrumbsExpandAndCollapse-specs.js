var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/AlwaysViewingPanel/GT-19110-BreadcrumbsExpandAndCollapse',
	title = 'GT-19110 - AlwaysViewingPanels: Breadcrumbs Collapse and Expand in 5way Navigation',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','AlwaysViewingPanels'];	// Tags show up in SauceLabs test output

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

	it('should expand and collapse breadcrumbs in 5way' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.item)
			.moveTo(0,0)
			.moveTo(10,10)
			.moveTo()
			.then(checkForOverlap(1))
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.then(checkForOverlap(2))
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.then(checkForOverlap(3))
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.then(checkForOverlap(4))
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.then(checkForOverlap(5))
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.then(checkForOverlap(6))
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.then(checkForOverlap(7))
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.then(checkForOverlap(6))
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.then(checkForOverlap(5))
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.then(checkForOverlap(4))
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.then(checkForOverlap(3))
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.then(checkForOverlap(2))
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.then(checkForOverlap(1))
			.nodeify(done);
	});

	//checkt to make sure transitions are spaced apart
	function checkForOverlap(currentPanelNum) {
		var firstPanelPosition = (currentPanelNum * -100) + 100;

		var transitionValues = {
			1 : firstPanelPosition,
			2 : firstPanelPosition + 100,
			3 : firstPanelPosition + 200,
			4 : firstPanelPosition + 300,
			5 : firstPanelPosition + 400,
			6 : firstPanelPosition + 500,
			7 : firstPanelPosition + 600
		};

	  	return function() {
	    	return browser
				.elementById(app.panel1)
				.getAttribute('style').should.eventually.contains(transitionValues[1])
				.elementById(app.panel2)
				.getAttribute('style').should.eventually.contains(transitionValues[2])
				.elementById(app.panel3)
				.getAttribute('style').should.eventually.contains(transitionValues[3])
				.elementById(app.panel4)
				.getAttribute('style').should.eventually.contains(transitionValues[4])
				.elementById(app.panel5)
				.getAttribute('style').should.eventually.contains(transitionValues[5])
				.elementById(app.panel6)
				.getAttribute('style').should.eventually.contains(transitionValues[6])
				.elementById(app.panel7)
				.getAttribute('style').should.eventually.contains(transitionValues[7]);
	  	};
	}

});

app = {
	item: 'gT-19110-BreadcrumbsExpandAndCollapse_item',
	panel1: 'gT-19110-BreadcrumbsExpandAndCollapse_panel',
	panel2: 'gT-19110-BreadcrumbsExpandAndCollapse_panel2',
	panel3: 'gT-19110-BreadcrumbsExpandAndCollapse_panel3',
	panel4: 'gT-19110-BreadcrumbsExpandAndCollapse_panel4',
	panel5: 'gT-19110-BreadcrumbsExpandAndCollapse_panel5',
	panel6: 'gT-19110-BreadcrumbsExpandAndCollapse_panel6',
	panel7: 'gT-19110-BreadcrumbsExpandAndCollapse_panel7'
};

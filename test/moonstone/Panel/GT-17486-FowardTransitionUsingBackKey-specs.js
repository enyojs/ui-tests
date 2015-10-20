var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Panel/GT-17486-FowardTransitionUsingBackKey',
	title = 'BackKey: Forward Transition in AlwaysViewingPanels',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','AlwaysViewingPanels','BackKey'];	// Tags show up in SauceLabs test output

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

	it('should have panels move forward when pressing back key if panels are collapsed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.panel1Item)
			.click()
			.delay(1000)
			.elementById(app.panel2Item)
			.click()
			.delay(1000)
			.elementById(app.panel3Item)
			.click()
			.delay(1000)
			.elementById(app.panel4Item)
			.click()
			.delay(1000)
			.elementById(app.panel5Item)
			.click()
			.delay(1000)
			.elementById(app.panel6Item)
			.click()
			.delay(1000)
			.elementById(app.panel6Breadcrumb)
			.getAttribute('style').should.eventually.equal('transform: translateX(-100%);')
			.elementById(app.panel1Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel1Breadcrumb)
			.getAttribute('style').should.eventually.equal('')
			.keys(helpers.keys.Back)
			.delay(500)
			.elementById(app.panel6Breadcrumb)
			.getAttribute('style').should.eventually.equal('transform: translateX(-100%);')
			.nodeify(done);
	});

});

app = {
	panel1Item: 'gT-17486-FowardTransitionUsingBackKey_item',
	panel2Item: 'gT-17486-FowardTransitionUsingBackKey_item6',
	panel3Item: 'gT-17486-FowardTransitionUsingBackKey_item11',
	panel4Item: 'gT-17486-FowardTransitionUsingBackKey_item16',
	panel5Item: 'gT-17486-FowardTransitionUsingBackKey_item21',
	panel6Item: 'gT-17486-FowardTransitionUsingBackKey_item26',
	panel1:'gT-17486-FowardTransitionUsingBackKey_panel',
	panel2:'gT-17486-FowardTransitionUsingBackKey_panel2',
	panel3:'gT-17486-FowardTransitionUsingBackKey_panel3',
	panel4:'gT-17486-FowardTransitionUsingBackKey_panel4',
	panel5:'gT-17486-FowardTransitionUsingBackKey_panel5',
	panel6:'gT-17486-FowardTransitionUsingBackKey_panel6',
	panel1Breadcrumb:'gT-17486-FowardTransitionUsingBackKey_panels_breadcrumb',
	panel2Breadcrumb:'gT-17486-FowardTransitionUsingBackKey_panels_breadcrumb2',
	panel3Breadcrumb:'gT-17486-FowardTransitionUsingBackKey_panels_breadcrumb3',
	panel4Breadcrumb:'gT-17486-FowardTransitionUsingBackKey_panels_breadcrumb4',
	panel5Breadcrumb:'gT-17486-FowardTransitionUsingBackKey_panels_breadcrumb5',
	panel6Breadcrumb:'gT-17486-FowardTransitionUsingBackKey_panels_breadcrumb6'
};
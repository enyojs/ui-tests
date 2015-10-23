var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/LightPanel/GT-18068-CharactersDontOverlap',
	title = 'GT-18068 - LightPanels: Characters Do Not Overlap in Nested LightPanels',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','LightPanels'];	// Tags show up in SauceLabs test output

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

	it('should not have overlapping characters' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.then(checkShowingItem(1))
			.elementById(app.upButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(1))
			.elementById(app.downButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(7))
			.elementById(app.upButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(5))
			.elementById(app.upButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(7))
			.elementById(app.downButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(5))
			.elementById(app.upButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(7))
			.elementById(app.downButton)
			.click()
			.delay(500)
			.click()
			.delay(500)
			.then(checkShowingItem(5))
			.nodeify(done);
	});

	//check that the item showing has visible and all other items are hidden
	function checkShowingItem(showingNum) {
		var showingArray = ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden','hidden','hidden','hidden'];
		var showingIndex = showingNum - 1;
		showingArray[showingIndex] = 'visible';

	  	return function() {
	    	return browser
				.elementById(app.controlItem1)
				.getComputedCss('visibility').should.eventually.equal(showingArray[0])
				.elementById(app.controlItem2)
				.getComputedCss('visibility').should.eventually.equal(showingArray[1])
				.elementById(app.controlItem3)
				.getComputedCss('visibility').should.eventually.equal(showingArray[2])
				.elementById(app.controlItem4)
				.getComputedCss('visibility').should.eventually.equal(showingArray[3])
				.elementById(app.controlItem5)
				.getComputedCss('visibility').should.eventually.equal(showingArray[4])
				.elementById(app.controlItem6)
				.getComputedCss('visibility').should.eventually.equal(showingArray[5])
				.elementById(app.controlItem7)
				.getComputedCss('visibility').should.eventually.equal(showingArray[6])
				.elementById(app.controlItem8)
				.getComputedCss('visibility').should.eventually.equal(showingArray[7])
				.elementById(app.controlItem9)
				.getComputedCss('visibility').should.eventually.equal(showingArray[8]);
	  	};
	}

});

app = {
	appId: 'gT-18068-CharactersDontOverlap',
	controlItem1: 'gT-18068-CharactersDontOverlap_control_controlPanel_item',
	controlItem2: 'gT-18068-CharactersDontOverlap_control_controlPanel_item2',
	controlItem3: 'gT-18068-CharactersDontOverlap_control_controlPanel_item3',
	controlItem4: 'gT-18068-CharactersDontOverlap_control_controlPanel_item4',
	controlItem5: 'gT-18068-CharactersDontOverlap_control_controlPanel_item5',
	controlItem6: 'gT-18068-CharactersDontOverlap_control_controlPanel_item6',
	controlItem7: 'gT-18068-CharactersDontOverlap_control_controlPanel_item7',
	controlItem8: 'gT-18068-CharactersDontOverlap_control_controlPanel_item8',
	controlItem9: 'gT-18068-CharactersDontOverlap_control_controlPanel_item9',
	downButton: 'gT-18068-CharactersDontOverlap_control_iconButton',
	upButton: 'gT-18068-CharactersDontOverlap_control_iconButton2'
};
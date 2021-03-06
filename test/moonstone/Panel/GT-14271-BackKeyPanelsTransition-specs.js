var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Panel/GT-14271-BackKeyPanelsTransition',
	title = 'GT-14271 - BackKey: Panels Transition while Focus spots back on Item',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','BackKey','panels','drawer'];	// Tags show up in SauceLabs test output

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

	it('should have panels transition while focus spots back on item' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(1000)
			.elementById(app.itemOne)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.panel)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.elementById(app.panel2)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')
			.keys(helpers.keys.Back)
			.delay(1000)
			.elementById(app.itemOne)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.panel)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')
			.nodeify(done);
	});

});

app = {
	itemOne: 'gT-14271-BackKeyPanelsTransition_item',
	panel: 'gT-14271-BackKeyPanelsTransition_panel',
	panel2: 'gT-14271-BackKeyPanelsTransition_panel2',
	panel1Title: 'gT-14271-BackKeyPanelsTransition_panel_header_title',
	panel2Title: 'gT-14271-BackKeyPanelsTransition_panel2_header_title'
};

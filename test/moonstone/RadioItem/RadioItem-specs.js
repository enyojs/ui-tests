var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/RadioItem/RadioItem',
	title = 'RadioItem - Moonstone Radio Item Sample',
	directory = 'ui-tests/dist',
	tags = ['moonstone','RadioItem'];	// Tags show up in SauceLabs test output

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

	it('Should have correct defaults' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.elementsByCssSelector('.moon-radio-item.selected')
			.should.eventually.have.length(1, 'one selected at start')
			.elementsByCssSelector('.moon-radio-item')
			.should.eventually.have.length(12, 'twelve radio items')
			.elementById(app.radioItem3)
			.getClasses().should.eventually.contain('disabled', 'radio 3 disabled')
			.elementById(app.radioItem7)
			.getClasses().should.eventually.contain('disabled', 'radio 7 disabled')
			.elementById(app.radioItem11)
			.getClasses().should.eventually.contain('disabled', 'radio 11 disabled')
			.nodeify(done);
	});

	it('Should have working ungrouped radio items' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			// Single radio item
			.elementById(app.radioItem)
			.click()
			.enyoPropertyGet(app.radioItem, 'selected').should.eventually.equal(true)
			.elementsByCssSelector(app.selectedClass)
			.should.eventually.have.length(2, 'two selected items')
			// two radio items
			.elementById(app.radioItem2)
			.click()
			.enyoPropertyGet(app.radioItem, 'selected').should.eventually.equal(true)
			.enyoPropertyGet(app.radioItem2, 'selected').should.eventually.equal(true)
			// Back to single radio item
			.elementById(app.radioItem)
			.click()
			.enyoPropertyGet(app.radioItem, 'selected').should.eventually.equal(false)
			.enyoPropertyGet(app.radioItem2, 'selected').should.eventually.equal(true)
			// Test disabled radio item
			.elementById(app.radioItem3)
			.click()
			.enyoPropertyGet(app.radioItem3, 'selected').should.eventually.equal(false)
			.nodeify(done);
	});

});

app = {
	appId: 'radioItem',
	radioItem: 'radioItem_radioItem',
	radioItem2: 'radioItem_radioItem2',
	radioItem3: 'radioItem_radioItem3',
	radioItem7: 'radioItem_radioItem7',
	radioItem11: 'radioItem_radioItem11',
	radioItemClass: 'moon-radio-item',
	selectedClass: '.moon-radio-item.selected'
};

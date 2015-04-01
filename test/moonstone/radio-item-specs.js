var helpers = rootRequire("./helpers");

var base = 'http://localhost:3000/',
	url = 'lib/moonstone/samples/RadioItemSample.html',
	title = 'Moonstone Radio Item Sample',
	tags = ['moonstone', 'RadioItem'];

describe('Radio Item Sample Test', function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("Should have correct title", function(done) {
		browser
			.get(url)
			.title()
			.should.become(title)
			.nodeify(done);
	});

	it("Should have correct defaults", function (done) {
		browser
			.elementsByCssSelector('.moon-radio-item.selected')
				.should.eventually.have.length(1, 'one selected at start')
			.elementsByCssSelector('.moon-radio-item')
				.should.eventually.have.length(12, 'twelve radio items')
			.elementById('radioItemSample_radioItem3')
				.getClasses().should.eventually.contain('disabled', 'radio 3 disabled')
			.elementById('radioItemSample_radioItem7')
				.getClasses().should.eventually.contain('disabled', 'radio 7 disabled')
			.elementById('radioItemSample_radioItem11')
				.getClasses().should.eventually.contain('disabled', 'radio 11 disabled')
			.nodeify(done);
	});

	it('Should have working ungrouped radio items', function (done) {
		browser
			// Single radio item
			.elementByCssSelector('#radioItemSample_radioItem')
				.click()
				.enyoPropertyGet('radioItemSample_radioItem', 'selected').should.eventually.be.true
				.elementsByCssSelector('.moon-radio-item.selected')
					.should.eventually.have.length(2, 'two selected items')
			// two radio items
			.elementByCssSelector('#radioItemSample_radioItem2')
				.click()
				.enyoPropertyGet('radioItemSample_radioItem', 'selected').should.eventually.be.true
				.enyoPropertyGet('radioItemSample_radioItem2', 'selected').should.eventually.be.true
			// Back to single radio item
			.elementByCssSelector('#radioItemSample_radioItem')
				.click()
				.enyoPropertyGet('radioItemSample_radioItem', 'selected').should.eventually.be.false
				.enyoPropertyGet('radioItemSample_radioItem2', 'selected').should.eventually.be.true
			// Test disabled radio item
			.elementByCssSelector('#radioItemSample_radioItem3')
				.click()
				.enyoPropertyGet('radioItemSample_radioItem3', 'selected').should.eventually.be.false
		.nodeify(done);
	});

});

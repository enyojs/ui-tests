var wd = require('wd');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var helpers = rootRequire("./helpers");

var url = 'http://localhost:3000/ui-tests/test/enyo/regressions/BHV-15490.html',
	title = 'BHV-15490',
	tags = ['core', 'regression'];

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var desired = helpers.initEnvironment(wd, title, tags);

describe('BHV-15490', function() {
	var browser;
	var allPassed = true;

	before(function(done) {
		browser = helpers.initBrowser(wd, desired, done);
	});

	afterEach(function(done) {
		allPassed = allPassed && (this.currentTest.state === 'passed');
		done();
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("Should execute correct test", function(done) {
		browser
			.get(url)
			.waitFor(wd.asserters.jsCondition('window.enyo !== undefined'), 90000)
			.should.eventually.be.ok
			.title()
			.should.become(title)
			.nodeify(done);
	});

	it("getAbsouteBounds should return proper values", function (done) {
		browser
			.execute("return test();").should.eventually.be.true
			.nodeify(done);
	});

});

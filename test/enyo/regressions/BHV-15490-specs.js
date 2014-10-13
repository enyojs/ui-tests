var wd = require('wd');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised"),
	url = 'http://localhost:3000/ui-tests/test/enyo/regressions/BHV-15490.html',
	title = 'BHV-15490';

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// checking sauce credential
if(!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY){
	console.warn(
		'\nPlease configure your sauce credential:\n\n' +
		'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
		'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
	);
	throw new Error("Missing sauce credentials");
}

// http configuration, not needed for simple runs
wd.configureHttp( {
	timeout: 90000,
	retryDelay: 15000,
	retries: 5
});

var desired = JSON.parse(process.env.DESIRED || '{browserName: "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];
desired['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;

wd.addElementPromiseChainMethod('getClasses', function() {
	return this
		.getAttribute('class').then(function(res) {
			return res.split(' ');
		});
});

// This isn't used but may be useful later
wd.addPromiseChainMethod('enyoExecute', function(id, method) {
	var args = Array.prototype.slice.call(arguments, 2);
	return this.execute("var obj = enyo.$['" + id + "'], fn = obj['" + method + "']; return fn.apply(obj, arguments);", args);
});

describe('BHV-15490', function() {
	var browser;
	var allPassed = true;

	before(function(done) {
		var username = process.env.SAUCE_USERNAME;
		var accessKey = process.env.SAUCE_ACCESS_KEY;
		browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
		if(process.env.VERBOSE){
			/* optional logging	 
			browser.on('status', function(info) {
				console.log(info.cyan);
			});
			browser.on('command', function(meth, path, data) {
				console.log(' > ' + meth.yellow, path.grey, data || '');
			});*/
		}
		browser
			.init(desired)
			.waitFor(wd.asserters.jsCondition('enyo !== undefined;'), 90000)
			.should.eventually.be.ok
			.nodeify(done);
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

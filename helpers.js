'use strict';
module.exports = {
	initEnvironment: function(wd, title, tags) {
		var desired = JSON.parse(process.env.DESIRED || '{browserName: "chrome"}');

		if(process.env.SAUCE === 'true') {
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
			if(process.env.TRAVIS_JOB_NUMBER) {	// Running on travis
				desired['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
			}
		}

		desired.name = title + ' with ' + desired.browserName;
		desired.tags = tags;

		wd.addElementPromiseChainMethod('getClasses', function() {
			return this
				.getAttribute('class').then(function(res) {
					return res.split(' ');
				});
		});

		wd.addPromiseChainMethod('enyoProperty', function(id, prop) {
			return this.execute("return enyo.$['" + id + "'].get('" + prop + "');");
		});

		// This isn't used but may be useful later
		wd.addPromiseChainMethod('enyoExecute', function(id, method) {
			var args = Array.prototype.slice.call(arguments, 2);
			return this.execute("var obj = enyo.$['" + id + "'], fn = obj['" + method + "']; return fn.apply(obj, arguments);", args);
		});

		return desired;
	},
	initBrowser: function (wd, desired, done) {
		var browser;
		if(process.env.SAUCE === 'true') {
			var username = process.env.SAUCE_USERNAME;
			var accessKey = process.env.SAUCE_ACCESS_KEY;
			browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
		} else {
			browser = wd.promiseChainRemote();
		}
		browser.init(desired).nodeify(done);
		return browser;
	}
};


'use strict';

module.exports = {
	phantomjs: {browserName: 'phantomjs'},
	chrome: {browserName: 'chrome'},
	firefox: {browserName: 'firefox'},
	explorer: {browserName: 'internet explorer'},
	tv: {
		tv: true,
		host: '10.195.248.57',	// TODO: Move to env
		port: 22,
		username: 'root',
		password: '',
		appId: 'com.palm.app.enyo2sampler',
		remapLocalhost: true
	}
};

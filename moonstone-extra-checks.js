var shelljs = require('shelljs');
var _ = require('lodash');

var getMoonstoneExtraTests = function(){
	var result = shelljs.exec('egrep -rl --include="*.js" "moonstone-extra" test', {silent: true});
	var resultsArray = result.output.split('\n');

	var moonstoneTests = _.map(resultsArray, function(result){
		if(result !== ''){
			return result.split('/')[3];
		}
	});
	moonstoneTests.pop();

	return moonstoneTests;
};

var getAllUsedTests = function(){
	if(process.env.MOONSTONE_EXTRA === 'false'){
		var moonstoneTests = getMoonstoneExtraTests();

		var moonstoneString = moonstoneTests.join('|');
		var extraTests = moonstoneString.substring(0, moonstoneString.length - 1);

		var nonExtraCmd = 'egrep -rlL --include="*specs.js" "'+extraTests+'" test';
		var nonExtraTests = shelljs.exec(nonExtraCmd, {silent: true});
		var nonExtraTestsArr = nonExtraTests.output.split('\n');
		nonExtraTestsArr.pop();

		//returns array of all tests without moonstone-extra
		return nonExtraTestsArr;
	} else {
		return ['test/**/*-specs.js'];
	}
};

exports.getAllUsedTests = getAllUsedTests;
exports.getMoonstoneExtraTests = getMoonstoneExtraTests;
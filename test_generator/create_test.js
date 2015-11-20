var fs = require('fs');
var readline = require('readline');
var exports = module.exports = {};

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.createTest = function(done) {
    rl.question('What is the name of your test?\n(e.g. GT-15940-EveryDayStringDisplay)\n\n', function(testName) {
        rl.question('What is the title of your Test?\n(e.g. GT-15940 - DayPicker: \'Every Day\' String Displays)\n\n', function(titleName) {
            rl.question('What is should your test do?\n(e.g. should display \'Every Day\' when all days are checked)\n\n', function(behavior) {
                rl.question('What are the tags for your test?\n(seperate tags by comma)\n(e.g. moonstone, qa, DayPicker, Picker )\n\n', function(tags) {
                    rl.question('Where would you like to place your test?\n(e.g. moonstone/ExpandablePicker)\n\n', function(path) {

                        //replace terms in files with answers
                        var fullPath = 'test/' + path + '/' + testName;
                        var skeletonSpecs = fs.readFileSync('test_generator/template-specs.js', 'utf-8');
                        var tagsRes = tags.replace(/\s*(,|^|$)\s*/g, '$1').split(',');
                        titleName = escapeString(titleName);
                        behavior = escapeString(behavior);
                        var specsRes = skeletonSpecs.replace('filePath', '\'' + fullPath + '\'').replace('skeletonTest', '\'' + titleName + '\'').replace('behavior', '\'' + behavior + '\'').replace('specTags', JSON.stringify(tagsRes));
                        var skeletonLoader = fs.readFileSync('test_generator/template-loader.js', 'utf-8');
                        var loaderRes = skeletonLoader.replace('testName', testName);

                        //check if file exists
                        if (!fs.existsSync('test/' + path + '/')) {
                            fs.mkdirSync('test/' + path + '/');
                        }
                        if (!fs.existsSync(fullPath)) {
                            fs.mkdirSync(fullPath);
                            fs.writeFileSync(fullPath + '-specs.js', specsRes);
                            fs.writeFileSync(fullPath + '/' + 'package.json', '{"main": "' + testName + '.js"}');
                            fs.writeFileSync(fullPath + '/' + testName + '.js', loaderRes);
                        } else {
                            console.error('Test Already Exists');
                        }
                        rl.close();
                        done();
                    });
                });
            });
        });
    });
};
//To escape string if user inputs quotes
function escapeString(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
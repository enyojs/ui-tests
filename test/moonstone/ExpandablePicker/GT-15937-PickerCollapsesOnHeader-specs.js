var helpers = rootRequire('./helpers'),
    app = {}; // Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
    path = 'test/moonstone/ExpandablePicker/GT-15937-PickerCollapsesOnHeader',
    title = 'GT-15937 - DayPicker: Picker Collapses upon Pointer/5way on Picker Header',
    directory = 'ui-tests/dist',
    tags = ['moonstone', 'qa', 'DayPicker']; // Tags show up in SauceLabs test output

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

    it('should display \'Selected Days\' when they are checked', function(done) {
        browser
            .setWindowSize(1920, 1280)
            .get(directory)
            .waitForElementById(app.dayPickerHeader)
            .click()
            .delay(500)
            .elementById(app.dayPicker)
            .getClasses().should.eventually.contain('open')
            .elementById(app.tuesdayId)
            .click()
            .delay(500)
            .elementById(app.wednesdayId)
            .click()
            .delay(500)
            .elementById(app.saturdayId)
            .click()
            .delay(500)
            .elementById(app.dayPickerHeader)
            .click()
            .delay(500)
            .elementById(app.dayPicker)
            .getClasses().should.eventually.not.contain('open')
            .elementById(app.currentValueString)
            .text().should.eventually.contain('Tue, Wed, Sat')
            .elementById(app.dayPickerHeader)
            .click()
            .delay(500)
            .keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightSelect])
            .elementById(app.dayPicker)
            .getClasses().should.eventually.contain('open')
            .keys([helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp])
            .elementById(app.dayPicker)
            .getClasses().should.eventually.not.contain('open')
            .elementById(app.currentValueString)
            .text().should.eventually.contain('Tue, Wed, Fri, Sat')
            .nodeify(done);
    });
});

app = {
    dayPicker: 'gT-15937-PickerCollapsesOnHeader_dayPicker',
    dayPickerHeader: 'gT-15937-PickerCollapsesOnHeader_dayPicker_header_header',
    sundayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem',
    mondayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem2',
    tuesdayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem3',
    wednesdayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem4',
    thursdayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem5',
    fridayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem6',
    saturdayId: 'gT-15937-PickerCollapsesOnHeader_dayPicker_checkboxItem7',
    currentValueString: 'gT-15937-PickerCollapsesOnHeader_nonGroupedPanel_header_subTitleBelow'
};
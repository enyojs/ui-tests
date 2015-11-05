# ui-tests

Enyo UI tests

## Getting Started

### Installing

UI testing relies on [node](nodejs.org) and the [enyo dev tools](https://github.com/enyojs/enyo-dev). Be sure these are installed correctly.

In addition, you will also need some form of web driver interface. See the documentation section below for more information on setting one up.
.
After cloning the _ui_tests_ repository to your machine, issue the following commands within the _ui-tests_ directory:

```
npm install -g grunt-cli
npm install
enyo init
```

Finally, the tests assume there is a web server running on port 3000 and that the root contains the *ui-tests* directory.

### Run tests on one browser via SauceLabs

```
grunt test:sauce:chrome
grunt test:sauce:firefox
grunt test:sauce:explorer
```

### Run parallel Tests on SauceLabs

```
grunt test:sauce:parallel
```

### Run local tests via Selenium

```
grunt test:local:phantomjs
grunt test:local:chrome
grunt test:local:firefox
```

### Run an individual test

```
grunt spec:local:chrome:GT-13944
grunt spec:sauce:firefox:radio-item
```
### Generating Test Files
If you would like to generate the files of a test run:
```
grunt generate:test
```

## Documentation

If you want to run the local tests through selenium then you'll need to be sure to have selenium running. Download the [selenium standalone server](http://www.seleniumhq.org/download/) and, if you want to run tests on Chrome, download [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads). Assuming both are in the same directory, run the server as follows:

```
java -jar selenium-server-standalone-2.42.2.jar -Dwebdriver.chromeriver=chromedriver
```

If you want to run sauce tests locally then you will need to set up a server to serve the source files and you will need to set up [Sauce Connect](https://docs.saucelabs.com/reference/sauce-connect/). Once set up, you will need to add your Sauce credentials as environment variables as described [here](https://docs.saucelabs.com/tutorials/node-js/).

These tests are intended to be run as a Travis CI task.

### Helpers

The `helpers` module adds some promise chain methods specifically for testing Enyo. Currently, these methods include:

* `getClasses` - Element method that returns the classes as an array.
* `textAsInt` - Element method that runs parseInt on the current element's text.
* `getProperty` - Element method that returns a specific property for an element.
* `enyoGetVisibleScrollerText` - Element method that finds the visible text in enyo moonstone scroller.
* `enyoGetParentElementId` - Element method that finds the parent element ID for the current enyo element.
* `enyoPropertyGet` - Browser method that finds an enyo instance by id and returns the value of a property.
* `enyoPropertySet` - Browser method that finds an enyo instance by id and sets the value of a property.

There is also a general method to scroll elements into view:

* `scrollIntoView` - Element method that calls scrollIntoView on the supplied element.
* `mousewheel` - Element method that simulates a mouse scroll. Use a positive number to scroll down and a negative number to scroll up.

Additionally, the `helpers` library includes a `keys` property that contains keycodes from `wd.SPECIAL_KEYS` as well as some Spotlight specific keys (`SpotlightDown`, `SpotlightSelect`, etc.).

## Gotchas
Most things work intuitively, but some code requires a work around for it work as intended
#### Spotlight
To have a spotlight show up you must use multiple `moveTo()` statements. The reason is because webdriver will not focus on an element on the first move. In chrome we must use 3 moves and in webOS we can use 2 moves. So we'll just use three moves to keep things safe.
```
// bad - this will not cause spotlight
.elementById(app.elementId)
.moveTo()

// good - this will cause spotlight to showup
.elementById(app.elementId)
.moveTo()
.moveTo(10,10)
.moveTo(20,20)
```

## Test Examples

The *test/qa* directory contains several tests that serve as examples. In particular, GT-13635, GT-13891, and GT-13913. For more information on the methods available for testing, refer to the [wd.js repo](https://github.com/admc/wd).

To speed up test creation, a sample test spec (_skeleton-specs.js_) is included.

## Testing on webOS devices

Several environment variables are supported for configuring how tests execute on webOS devices. These include:

* `WEBOS_IP` - IP Address of the webOS device. e.g. `WEBOS_IP=10.0.1.25`
* `WEBOS_PORT` - Port of webOS device (default 22).  e.g. `WEBOS_PORT=9922`
* `REMAP_LOCALHOST` - Looks for `localhost:3000` in web addresses and remaps them to the supplied IP address:port.  e.g.  `REMAP_LOCALHOST=10.0.1.9:8888`
* `MOONSTONE_EXTRA` - Flag for moonstone extra library. `MOONSTONE_EXTRA=false` means run all tests that do not use moonstone extra. If you want to run moonstone extra tests just omit this variable.

## Contributing

Please see the [style guide](http://enyojs.com/docs/latest/best-practices/style-guide.html).

## License

Copyright (c) 2014-2015 LG Electronics
Licensed under the Apache 2.0 license.

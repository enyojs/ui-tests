# ui-tests

Enyo UI tests

## Getting Started

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

## Documentation
If you want to run sauce tests locally then you will need to set up a server to serve the source files and you will need to set up [Sauce Connect](https://docs.saucelabs.com/reference/sauce-connect/). Once set up, you will need to add your Sauce credentials as environment variables as described [here](https://docs.saucelabs.com/tutorials/node-js/).

If you want to run the local tests through selenium then you'll need to be sure to have selenium running. Download the [selenium standalone server](http://www.seleniumhq.org/download/) and, if you want to run tests on Chrome, download [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads). Assuming both are in the same directory, run the server as follows:

```
java -jar selenium-server-standalone-2.42.2.jar -Dwebdriver.chromeriver=chromedriver
```

Finally, the tests assume there is a web server running on port 3000 and that the root contains Enyo, the required libraries in *lib*, and the *ui-tests* directory.

These tests are intended to be run as a Travis CI task.

### Helpers

The `helpers` module adds some promise chain methods specifically for testing Enyo. Currently, these methods include:

* `getClasses` - Element method that returns the classes as an array
* `enyoPropertyGet` - Browser method that finds an enyo instance by id and returns the value of a property.
* `enyoPropertySet` - Browser method that finds an enyo instance by id and sets the value of a property.

There is also a general method to scroll elements into view:

* `scrollIntoView` - Element method that calls scrollIntoView on the supplied element

Additionally, the `helpers` library includes a `keys` property that contains keycodes from `wd.SPECIAL_KEYS` as well as some Spotlight specific keys (`SpotlightDown`, `SpotlightSelect`, etc.).

## Test Examples
The *test/qa* directory contains several tests that serve as examples. In particular, GT-13635, GT-13891, and GT-13913. For more information on the methods available for testing, refer to the [wd.js repo](https://github.com/admc/wd).

## Testing on webOS devices
Several environment variables are supported for configuring how tests execute on webOS devices. These include:

* `WEBOS_IP` - IP Address of the webOS device. e.g. `WEBOS_IP=10.0.1.25`
* `WEBOS_PORT` - Port of webOS device (default 22).  e.g. `WEBOS_PORT=9922`
* `REMAP_LOCALHOST` - Looks for `localhost:3000` in web addresses and remaps them to the supplied IP address:port.  e.g.  `REMAP_LOCALHOST=10.0.1.9:8888`

## Contributing
Please see the [style guide](http://enyojs.com/docs/latest/best-practices/style-guide.html).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## License
Copyright (c) 2014-2015 LG Electronics
Licensed under the Apache 2.0 license.

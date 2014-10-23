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

## Documentation
If you want to run sauce tests locally then you will need to set up a server to serve the source files and you will need to set up [Sauce Connect](https://docs.saucelabs.com/reference/sauce-connect/).

If you want to run the local tests through selenium then you'll need to be sure to have selenium running.  e.g.:

```
java -jar selenium-server-standalone-2.42.2.jar -Dwebdriver.chromeriver=chromedriver
```

These tests are intended to be run as a Travis CI task.

## Examples
_(Coming soon)_

## Contributing
Please see the [style guide](http://enyojs.com/docs/latest/best-practices/style-guide.html).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## License
Copyright (c) 2014 Roy Sutton  
Licensed under the Apache 2.0 license.

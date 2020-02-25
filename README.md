# f2c-extension

A browser extension for automatically converting degrees Fahrenheit to degrees Celsius in the page text.

## Scripts

Commands are given with `yarn`, `npm run` will also work.

| Command         | Description                                                                   |
| ---             | ---                                                                           |
| `yarn build`    | Builds the extension with Webpack in the `dist` directory.                    |
| `yarn dev`      | `web-ext` opens an instance of Firefox with the extension temporarily installed for testing. Note the existence of `test\test.html` to help with manual testing. |
| `yarn lint:ext` | Lint the web extension config with `web-ext`.                                  |
| `yarn lint:code` | Runs Eslint against the code.                                                 |
| `yarn test:src`  | Runs the unit tests with Mocha. Test files live next to the module they test. |

## To Do

* Currently tested against Firefox. Test against Chrome.
* Include Eslint and Mocha in the Webpack build process.

## Future Enhancements

* Wrap the modified content in a `span` and style to highlight changes.
* Allow extension to be turned off from the `browser action` popup.
* Count how many changes were made and display in the popup.
* Process numbers written as words.
* Handle temperatures ranges and single temperatures in the same text node.
* Get a proper icon.
* Publish the extension on https://addons.mozilla.org/ . See https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/#distributing-your-addon .

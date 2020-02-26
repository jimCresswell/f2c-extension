# f2c-extension

![Node.js CI](https://github.com/jimCresswell/f2c-extension/workflows/Node.js%20CI/badge.svg)

A browser extension for automatically converting degrees Fahrenheit to degrees Celsius in the page text.

## Scripts

Commands are given with `yarn`, `npm run` will also work.

| Command         | Description                                                                   |
| :---             | :---                                                                           |
| <code>yarn&nbsp;build</code>    | Builds the extension with Webpack in the `dist` directory.                    |
| <code>yarn&nbsp;dev</code>      | `web-ext` opens an instance of Firefox with the extension temporarily installed for testing. Note the existence of `test\test.html` to help with manual testing. |
| <code>yarn&nbsp;lint:ext</code> | Lint the web extension config with `web-ext`.                                  |
| <code>yarn&nbsp;lint:code</code> | Runs Eslint against the code.                                                 |
| <code>yarn&nbsp;test:src</code>  | Runs the unit tests with Mocha. Test files live next to the module they test. |

## Notes

* Continuous integration is via GitHub actions, config is [here](.github\workflows).
* Babel is used to transpile the test code, but not the application code (it doesn't need it yet). An alternative would be to remove Babel from the Mocha options and use [mocha-webpack](https://github.com/zinserjan/mocha-webpack) instead.

## To Do

* Currently tested against Firefox. Test against Chrome.

## Future Enhancements

* Wrap the modified content in a `span` and style to highlight changes.
* Allow extension to be turned off from the `browser action` popup.
* Count how many changes were made and display in the popup.
* Process numbers written as words.
* Handle temperatures ranges and single temperatures in the same text node.
* Get a proper icon.
* Publish the extension on [https://addons.mozilla.org/](https://addons.mozilla.org/). See [https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/#distributing-your-addon](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/#distributing-your-addon).

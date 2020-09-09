# NYPL Header React NPM Component

[![GitHub version](https://badge.fury.io/gh/nypl%2Fdgx-header-component.svg)](https://badge.fury.io/gh/nypl%2Fdgx-header-component)

[![npm version](https://badge.fury.io/js/%40nypl%2Fdgx-header-component.svg)](https://badge.fury.io/js/%40nypl%2Fdgx-header-component)

This repository is for the header component used in React applications at NYPL.

### Version

> v2.7.0

### App Installation

To install this module, run:

```sh
$ npm install --save @nypl/dgx-header-component
```

This component is a scoped NPM module. This means that when installing, NPM will create a `@NYPL` folder and the `dgx-header-component` module (and other NYPL scoped modules) will be there.

### Usage

Import using ES6 style syntax:
```
// Application.jsx
import { Header, navConfig } from '@nypl/dgx-header-component';
```

Import using ES5 style syntax:
```
// Application.jsx
var HeaderComponent =  require('@nypl/dgx-header-component');
var Header = HeaderComponent.Header;
var navConfig = HeaderComponent.navConfig;
```

Call the instance in your application component:
```
<Header
  skipNav={{ target: 'mainContent' }}
  navData={navConfig.current}
/>
```

Install the polyfill For IE 11 and older version browsers:
The polyfill for ES6 Promise is essential for the header to be rendered correctly on IE 11 and older browsers, as the version of axios we are using no longer supports ES6 Promise as default.

NPM Install `"babel-polyfill": "6.20.0"` as a dependency to the application you want to import the header component to.

```
npm install --save babel-polyfill@6.20.0;
```

For `nypl-dgx-react-header`, as it will be built before uploaded, the polyfill can be installed as
devDependency.

```
npm install --save-dev babel-polyfill@6.20.0;
```

At the very beginning of the entry file of the application, put

```
import "babel-polyfill";
```

In the application's `webpack.config.js`, put `'babel-polyfill'` in the `entry` array of each environment. For example,

```
entry: [
 'babel-polyfill',
  path.resolve(ROOT_PATH, 'src/client/App.jsx')
],
```

or

```
entry: [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  'babel-polyfill',
  path.resolve(ROOT_PATH, 'src/client/App.jsx')
],
```

### Test

To run unit tests, run `npm test` in the terminal. Or run `npm run test-with-coverage` to run the test and see the test coverage.

Running unit tests with those commands will set the environment variable `IS_TEST_ENV` to be true.

### Navigation Configuration
The current navigation can be used by importing `navConfig` from the module and passing it as a prop. Custom navigation can be passed if it follows a similar structure to what is in `/src/navConfig.js`.

### Styles
You can write your own styles for the header but we suggest you use the styles that come in the package. It's written in SASS and to import we use the Webpack syntax in SASS:

```
// app.scss
@import "~@nypl/dgx-header-component/dist/styles/main";
```

### Local Installation
Install all dependencies listed under package.json

```sh
$ npm install
```

### Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

This starts the server at localhost:3001 defaulting to `NODE_ENV=development`.

```sh
$ npm run start:dev
```

### Component Props

- `className`: Class to be assigned to the main header container (String, default: "Header")

- `id`: ID to be assigned to the main header container (String, default: "nyplHeader")

- `lang`: Language. Not used, but provided for future internationalization (String, default: "en")

- `urlType`: Type of URL's to be established for all link elements. If empty, it will utilize `relative` URL's by default. If `absolute` URL's are required, initialize the Header component as follows (String, default: ""):

```sh
  <Header urlType='absolute' /> // Sets all URLs to absolute
  <Header /> // Sets all URLs to relative
```

- `navData`: Array containing all navigation links. This is required in order to populate the Header navigation. (Array, default: [])

```sh
  import { Header, navConfig } from 'dgx-header-component';
  <Header navData={navConfig.current} />
```

- `skipNav`: Props to be passed to the `SkipNavigation` component. If these are
  not supplied the skip navigation link will not be output. It will also not be
  output if the props are not sufficient for the component (Object, default:
  null)

  For example, to generate a header that has a skip navigation that targets the id
`#topContent`:

```sh
  <Header skipNav={{ target: 'topContent' }} />
```

### Skip Navigation

If skip navigation is used, the skip navigation link will be the first link in
the header and--since there should be no link before the header in the
page--should be the first link on the page. Though visually hidden, it will be
read by screen readers. When using a visual browser, the first press of the TAB
key should focus the skip navigation link which will reveal it visually.

If the target of the link is not naturally focusable, as a div is not, it should
be given a tab-index of −1. This allows the element to receive programmatic focus
while being ignored during normal navigation flow.

### Production Mode
*TODO: The following needs to be updated with the Webpack update and will currently not run.*

To build the component and serve the minified files, run the following two commands. Setting the `NODE_ENV` flag to production triggers the production environment.

```sh
$ npm run dist
$ NODE_ENV=production npm start
```

### Using Feature Flags

Please go to NYPL/dgx-feature-flags repository for the step-by-step instruction.
https://bitbucket.org/NYPL/dgx-feature-flags

### How the Patron Log in Cookie Works

We use a specific NYPL patron log in cookie to decide the logged in status. For more details, please see [PATRONCOOKIE.md](./PATRONCOOKIE.md).

### Contributing is fun and easy!

1. Clone this repo.
2. Checkout the `development` branch and run `npm install`.
3. Create a feature branch from `development` - `git checkout -b new-feature`.
4. When your work is ready to commit, run `npm run dist` to build the minified bundle.
5. Update `package.json` with new version number, update the `README.md` & `CHANGELOG.md` with relevant info.
6. Commit your changes - `git commit -am 'Description of feature'`.
7. Push the branch to Github - `git push origin new-feature`.
8. Create a new pull request and make sure it is pointed at the `development` branch.
9. Upon approval, merge the pull request to `development`.
10. Create a new pull request on Github for `development` ->  `master`.
11. Upon approval, merge into master and then locally pull the latest.
12. Tag `master` with the new release `git tag vx.x.x`.
13. Push the tags to the remote origin `git push --tags`.
14. Update the release version on the remote in this case [https://github.com/NYPL/dgx-header-component/releases](https://github.com/NYPL/dgx-header-component/releases).
15. Update the `npm` module: Return to your command line, and run `npm publish` from the project root.
16. Pat self on back. Enjoy a nice 🌮 dinner.

The steps may change if many features are being worked on in parallel. In that case, it is best to create a release branch `release-x.x.x` from `development`, and point all new feature pull requests to that release branch. Then, once all the features are complete and QA-ed, merge in `release-x.x.x` into `development`.

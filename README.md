# NYPL Header React NPM Component

[![GitHub version](https://badge.fury.io/gh/nypl%2Fdgx-header-component.svg)](https://badge.fury.io/gh/nypl%2Fdgx-header-component)

[![npm version](https://badge.fury.io/js/%40nypl%2Fdgx-header-component.svg)](https://badge.fury.io/js/%40nypl%2Fdgx-header-component)

This repository is for the header component used in React applications at NYPL.

### Version

> v2.4.19

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

This starts the server at localhost:3000 defaulting to `NODE_ENV=development`.

```sh
$ npm start
```

### Accessibility with React-a11y
To use the react-a11y plugin start the development server with the `loadA11y` environment variable set to true (false by default):

```sh
$ loadA11y=true npm start
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
To build the component and serve the minified files, run the following two commands. Setting the `NODE_ENV` flag to production triggers the production environment.

```sh
$ npm run babel-build
$ NODE_ENV=production npm start
```

### Using Feature Flags

Please go to NYPL/dgx-feature-flags repository for the step-by-step instruction.
https://bitbucket.org/NYPL/dgx-feature-flags

### How the Patron Log in Cookie Works

We use a specific NYPL patron log in cookie to decide the logged in status. For more details, please see [PATRONCOOKIE.md](./PATRONCOOKIE.md).

### Contributing is fun and easy!

1. Clone this repo.
2. Checkout & create a feature branch from `development` - `git checkout development && git checkout -b new-feature`, do your good works.
3. When your work is ready to commit, run `npm run babel-build`
4. Commit your changes - `git commit -am 'Description of feature'`.
5. Push the branch - `git push origin new-feature`.
6. Create a new Pull Request and make sure it is pointed at the `development` branch.
7. Upon approval, merge to `development`
8. Create release branch: `git checkout -b release-v.x.x.x`
9. Update `package.json` with new version number, update the `README.md` & `CHANGELOG.md` with relevant info.
10. Commit those changes and merge back to development: `git merge --no-ff release-x.x.x`
11. Push `development` to the remote origin
12. Checkout `master` & `git merge --no-ff development`
13. Tag `master` with the new release `git tag vx.x.x`
14. Push `master` to the remote origin
15. Push the tags to the remote origin `git push --tags`
16. Update the release version on the remote in this case [https://github.com/NYPL/dgx-header-component/releases](https://github.com/NYPL/dgx-header-component/releases)
17. Update the `npm` module: Return to your command line, and run `npm publish` from the project root.
18. Pat self on back. Enjoy a nice 🌮 dinner.

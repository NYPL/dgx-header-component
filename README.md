# NYPL Header React NPM Component

This repository is for the header component used in React applications at NYPL.

### Version

1.4.0

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

Feature flags help us moderate user studies for the coming new updates and keep the stable version of the header at the same time. By enabling specific feature flags, the user may interact with the new fucntions and interfaces, while by disabling it, the user goes back to use the exsisting released version.

The applications that want to use feature flags need to install the feature flag module first. And then depending on the way we want to toggle feature flags, some functions need to be added in the entry js file.

Below is a possible way to execute feature flags by the dev tool of the browser.

1. To install fature flags, have this line in the package.json and execute npm install.

```sh
"dgx-feature-flags": "git+https://git@bitbucket.org/NYPL/dgx-feature-flags.git#master"
```

2. In the entry js file of the application we like to have feature flags, import the feature flags module we just installed.

One possible way in ES6 style could be,

```sh
import FeatureFlags from 'dgx-feature-flags';
```

3. Expose feature flag to the browser. Have these lines of codes in the same entry js file.

```sh
if (!window.dgxFeatureFlags) {
  window.dgxFeatureFlags = FeatureFlags.utils;
}
```

4. Run the application. Open the dev tool of your browser. In console, type the line below and press enter to enable the feature flag.

```sh
dgxFeatureFlags.activateFeature([Your feature flag's name here. It should be a string.])
```
On the other hand, type

```sh
dgxFeatureFlags.deactivateFeature([Your feature flag's name here. It should be a string.])
```

to disable the feature flag.

### Contribute

1. Fork this repo.
2. Create a feature branch - `git checkout -b new-feature`.
3. Commit your changes - `git commit -am 'Description of feature'`.
4. Push the branch - `git push origin new-feature`.
5. Create a new Pull Request.

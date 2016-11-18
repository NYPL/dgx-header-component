# NYPL Header React NPM Component

This repository is for the header component used in React applications at NYPL.

### Version

1.4.2

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

Please go to NYPL/dgx-feature-flags repository for the step-by-step instruction.
https://bitbucket.org/NYPL/dgx-feature-flags

### Contribute

1. Fork this repo.
2. Create a feature branch - `git checkout -b new-feature`.
3. Commit your changes - `git commit -am 'Description of feature'`.
4. Push the branch - `git push origin new-feature`.
5. Create a new Pull Request.

### CHANGE LOG

#### v1.4.2
> Updated all Header donation URLs

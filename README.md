# NYPL Header React NPM Component

## Installation
```sh
$ npm install
```

## Development Server
Using Webpack hot-reload server at localhost:3000
```sh
$ npm start
```

## Accessibility with React-a11y
To use the react-a11y plugin start the development server with the `loadA11y` environment variable set to true (false by default):

```sh
$ loadA11y=true npm start
```

## Component Props

- `className`: Class to be assigned to the main header container (String, default: "Header")

- `id`: ID to be assigned to the main header container (String, default: "nyplHeader")

- `lang`: Language. Not used, but provided for future internationalization (String, default: "en")

- `urlType`: Type of URL's to be established for all link elements. If empty, it will utilize `relative` URL's by default. If `absolute` URL's are required, initialize the Header component as follows (String, default: ""):

```sh
  <Header urlType='absolute' /> // Sets all URLs to absolute
  <Header /> // Sets all URLs to relative
```

- `navData`: Array containing all navigation links. This is required in order to populate the Header navigation. (Array, default: [])

- `skipNav`: Props to be passed to the `SkipNavigation` component. If these are
  not supplied the skip navigation link will not be output. It will also not be
  output if the props are not sufficient for the component (Object, default:
  null)

  For example, to generate a header that has a skip navigation that targets the id
`#topContent`:

```sh
  <Header skipNav={{ target: 'topContent' }} />
```

## Accessibility

### Skip Navigation

If skip navigation is used, the skip navigation link will be the first link in
the header and--since there should be no link before the header in the
page--should be the first link on the page. Though visually hidden, it will be
read by screen readers. When using a visual browser, the first press of the TAB
key should focus the skip navigation link which will reveal it visually.

If the target of the link is not naturally focusable, as a div is not, it should
be given a tab-index of −1. This allows the element to receive programmatic focus
while being ignored during normal navigation flow.

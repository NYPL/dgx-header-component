### CHANGE LOG

========

### v2.8.0
> Adds a third radio button to the search form. There are now three search options:
- Search the Circulating Catalog
- Search the Research Catalog
- Search NYPL.org
- Removes the two "Catalog" and "NYPL.ORG" mobile search buttons and replaces them with three radio buttons.
- Updates text for each radio button in the search form.
> Removes the "Log In" button and replaces it with "My Account" button. The user's name and logout links will no longer be displayed.
> Removes the NYPL Design Toolkit package.

### v2.7.1
> Centers the alert/closing message in global header.

### v2.7.0
> Updates packages for a better build.

### v2.6.0
> Remove Kievit font

### v2.5.8
> Fix bugs introduced in 2.5.6:
  - Logging in with a non-catalog redirect_uri causes immediate logout
  - Logout iframe is loaded recklessly for users that are not logged in

### v2.5.7
> Update package-lock.json file that prevent newer version of packages to load and locally build the app properly. Updated documented git workflow for contributing.

### v2.5.6
> Update the method that logs out users from Encore to also check the domain of Test Research Catalog for QA use.

### v2.5.5
> Update the method for setting cookies. The previous method had an incorrect string structure.

### v2.5.4
> Update the method that logs out users from Encore to check the domain of Catalog also since it will log out the users from Catalog at the same time as a side effect.

### v2.5.3
> Add the method to completely log out the users by loading the log out endpoint with an invisible iframe.
> Update the eslint rules and the scripts in package.json to run lint.

### v2.5.2
> Add the mechanism to delete the cookie that holds the last visit time for Encore if the user is not logged in.

### v2.5.1
> Add the mechanism to make sure that Header is shown to be logged out if the log in related cookies from Encore are deleted.

### v2.5.0
> Add the mechanism to remove log in related cookies from Encore, so the patron's log in status will be consistent with Encore server.

### v2.4.19
> Remove the hardcoding to test that dist was the solution.

### v2.4.18
> Run babel-build so that the dist directory is updated.

### v2.4.17
> Hard-codes appEnv to production.

### v2.4.16
> Sets catalogBaseUrl when appEnv is undefined

### v2.4.15
> Adds a check for QA in APP_ENV

### v2.4.14
> Uses APP_ENV to update catalogBaseUrl

### v2.4.13
> Updates catalogBaseUrl to //dev-www.nypl.org/search/ in development environment

### v2.4.12
> Points website searches to /search/ instead of /apachesolr_search/

### v2.4.11
> Fixes outstanding HTML conformance issues
  - Fixes CSS: border-radius: Too many values or values are not recognized
> Refactor inline style for line height of .emailSubscription-newEmail button into scss, to facilitate fix for locations-app.

### v2.4.10
> More updates to focus styles for mobile context
  - covers logged in and logged out states
  - now using flex box
> Fixes a broken layout in Subscribe dropdown when a user has already signed up [WWW-389](https://jira.nypl.org/browse/WWW-389)
> updated dgx-svg-icons to v0.3.7, and the relate changes for the new icons.
> updated the paths for importing `_mixin.scss` and `_buttons.scss`.

### v2.4.9
> updated :focus style for links, button, and the forms found in the header
> fixed up some css ordering of rules
> now using `node-sass 4.6.0` if it gives problems for your version of node, try rolling back to 3.8.0.

### v2.4.8
> Small CSS bug fixes, specifically to the dropdowns. The logged in dropdown had a huge log out SVG icon, and the email updates dropdown's input field was misaligned.

### v2.4.7
> Fixes #39 where the icons were not laying out properly for email & library card buttons in the mobile header. flexbox to the rescue
> Added the Shop button / link to mobile header w/ new shopping bag icon added in from [dgx-svg-icons](https://github.com/NYPL/dgx-svg-icons)

### v2.4.6
> No more questionable Futurama based ipsum, now with more Starwars ipsum.
> Updated the contribution work flow on the README.md

### v2.4.5
> Updating the version to fix v2.4.4 is not able to be fully downloaded on NPM platform.

### v2.4.4
> Updating the function of trackSearchQuerySend in utils.js to send GA events with a callback.
> Updating the URL queries when making a search request to apachesolr search/site search.

### v2.4.3
> Hotfix to get line-height properly set for the dropdowns, which get overridden in a few apps.

### v2.4.2
> Adding missing GA code from Bitbucket remote.
> Adding CSS vendor prefixes to arrow transforms.
> Reverting back to using babel instead of webpack for building the min files.
> Adding CSS fix for transform rule not working on iOS.

### v2.4.1
> Second accessibility update! This update includes:
> Updating Header component to track GA events in LogIn button.
> Updating mobile and desktop dropdown usability and handling of focus within each dropdown.
> Better labels for buttons.
> Updated all icons to use SVGs from the @nypl/dgx-svg-icons.
> Better build using webpack 2.
> Bumping up npm package versions.

#### v2.4.0
> This is the first release (of two) with accessibility updates. This update includes:
> Update to the focus ring.
> Update to the desktop version of the 'Log In' and 'Get Email Updates' dropdowns.
> Update to the mobile version of the navigation menu.
> Removal of the 'sticky header'.
> Adding role attributes to the alerts and fundraising banner.

#### v2.3.1
> Updating the dgx-react-ga related functions based on the new version of it.
> Adding the config file for GA.
> Updating the way to set custom dimensions for GA.

#### v2.3.0
> Added FundraisingBanner component to display a banner triggered by FeatureFlags
> Added SASS partial for FundraisingBanner that scoped viewport widths in the file
> Updated a few test NPM packages that were outdated in order to unit test the FundraisingBanner component

#### v2.2.0
> Adding the function to send the GA event with its Category as "Search" and Action as "QuerySent" when submitting a search request via the header.
> Adding the related functions in the "utils.js" for setting dimensions of GA events.

#### v2.1.1
> Updating the mechanism for handling failed cookie refreshing process. Now it will delete the cookie of `nyplIdentityPatron` if it receives an error from the refresh token API.
> Adding PATRONCOOKIE.md for the information of how `nyplIdentityPatron` and log in work.

#### v2.1.0
> Updating the header Donate and Shop links.
> Updating the structure for the header links to be a <nav> and <ul> list.
> Allowing prop to be passed to the component for a patron's logged in status and information.
> Updating the OAuth URL for the Patron authorization endpoint.

#### v2.0.0
> Updating the React version to v15.
> Updating the CSS for the skip nav component.
> Updating other React packages to better support v15.

#### v1.5.5
> Updated the log in, the log out, and the refresh links to login server instead of beta-oauth server. For instance, the log in link now is "https://login.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount". Also, updated the unit tests for the URLs changes.

#### v1.5.4
> Updated the log in, the log out, and the refresh links to beta-oauth server instead of isso server. For instance, the log in link now is "https://beta-oauth.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount". Also, updated the unit tests for the URLs changes.

#### v1.5.3
> Removed the console loggings for token expiration.

#### v1.5.2
> Removed the Feature Flag of "OAuthLogin" as OAuth Login is going to be default. Also Removed the related props in the <MyNypl> and <MobileMyNypl>.

#### v1.5.1
> Updated the encore search link to start with HTTPS.
> Added the fallback for the log in button in case that JavaScript doesn't work. It will work as a link to the catalog page.

#### v1.5.0
> Added the new functions of OAuth log in.
> Added the new styles to "My NYPL Button" and "My NYPL Dropdown menu". The new styles will dynamically update based on the log in status.
> Added the tests for the new functions.
> Updated the version of "axios", and imported ES6 Promise polyfill for the compatibility of older browsers.

#### v1.4.3
> Updated all Header donation URLs

### CHANGE LOG

#### v2.2.0
> Adding the function to send the GA event with its Category as "Search" and Action as "QuerySent" when submitting a search request via the header.
> Adding the related functions in the "utils.js" for setting dimenstions of GA events.

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

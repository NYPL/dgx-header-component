/* this file is for the unit test of log in/ log out function on the header
the test goals include
  1. Log in properly.
    a. Lead the user the log in page
    b. Direct the user to the catalog page they have chosen after being logged in
    c .Request user's data
    d. Update the visual interfaces
    e. Remain logged in unless the user logs out
  2. Log in error handling
    a. If requesting log in cookie and the access_token failed
    b. If requesting user's data failed -- probably log the patron out
    c. If the log in cookie is expired
  3. Log out poperly
    a. Log out the user
    b. Direct the user back to the previous page
    c. Update the visual interfaces
*/

// If the log in cookie is expired
// a. After we make the api call, if we get the response with
//  "statusCode":401 and "expired":true
// b. Hit refresh URL, and nyplIdentityPatron cookie will be updated
//  b.1 If caling the refresh URL failed, follow the steps for the case of calling user's data failed
// c. The endpoint will update access_toke from nyplIdentityPatron cookie automatically
// d. Make the call to get patron's data again
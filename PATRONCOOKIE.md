### INFORMATION ABOUT THE PATRON LOG IN COOKIE

For NYPL's patron to log in, our OAuth service will assign the cookie `nyplIdentityPatron` to the patron's browser once she/he successfully logged in. After that, she/he can use the links on the `Account` dropdown menu directly to the catalogs.

#### Cookie Expired and Refresh

The cookie has a specific expired time. Once it is expired, the header will try to refresh it if patron click any link or simply refresh the page. NYPL's OAuth service offers a refresh API link for this need. The API link will check the cookie's refresh token section to execute the refresh process. Once it is successfully refreshed, the logged in status will remain.

#### Failed Cookie Refreshing

If the refresh process fails, the header will delete the cookie of `nyplIdentityPatron`. The patron will need to enter her/his log in credentials again.

#### Log out

The log out link on `Account` dropdown menu will log the patron out. However, due to the limits from our catalog service, we have to utilize the log out mechanism from the catalogs, so we can sync the logged in status among the header and the catalogs. As a results, after logged out, the patron will always be redirected to the log out page of the catalog.

const mockResponseData = {
  "data": {
    "decodedToken": {
      "iss": "https://www.nypl.org",
      "sub": "6367028",
      "aud": "app_login",
      "iat": 1482176470,
      "exp": 1482180070,
      "auth_time": 1482176470,
      "scope": "openid offline_access cookie patron:read"
    },
    "patron": {
      "id": "6367028",
      "updatedDate": "2016-12-13T19:49:57+00:00",
      "createdDate": "2015-09-03T14:16:20+00:00",
      "deletedDate": null,
      "deleted": false,
      "suppressed": false,
      "names": [
        "SMITH, THERESA",
      ],
      "barCodes": [
        "23333097542730",
      ],
      "expirationDate": "2018-09-03",
      "homeLibraryCode": "ma",
      "birthDate": "1972-05-13",
      "emails": [
        "robkelley@nypl.org",
      ],
      "fixedFields": [
        {
          "label": "PDATE",
          "value": "2016-11-21T16:54:11Z",
          "display": null,
        },
        {
          "label": "Education Level",
          "value": "-",
          "display": null,
        },
        {
          "label": "School Code",
          "value": "0",
          "display": null,
        },
        {
          "label": "Highest Overdues",
          "value": 0,
          "display": null,
        },
        {
          "label": "Record Type",
          "value": "p",
          "display": null,
        },
        {
          "label": "Home Library",
          "value": "ma   ",
          "display": null,
        },
        {
          "label": "FIRM",
          "value": "",
          "display": null,
        },
        {
          "label": "Current Item D",
          "value": 0,
          "display": null,
        },
        {
          "label": "Expiration Date",
          "value": "2018-09-03T08:00:00Z",
          "display": null,
        },
        {
          "label": "Patron Type",
          "value": "10",
          "display": null,
        },
        {
          "label": "Patron Agency",
          "value": "51",
          "display": null,
        },
        {
          "label": "PIUSE",
          "value": 0,
          "display": null,
        },
        {
          "label": "Record Number",
          "value": "6367028",
          "display": null,
        },
        {
          "label": "Total Checkouts",
          "value": 0,
          "display": null,
        },
        {
          "label": "ILL Request",
          "value": 0,
          "display": null,
        },
        {
          "label": "Current Item B",
          "value": 0,
          "display": null,
        },
        {
          "label": "Claims Returned",
          "value": 0,
          "display": null,
        },
        {
          "label": "E-Communications",
          "value": "-",
          "display": null,
        },
        {
          "label": "Overdue Penalty",
          "value": 0,
          "display": null,
        },
        {
          "label": "Preferred Language",
          "value": "eng",
          "display": null,
        },
        {
          "label": "Patron Message",
          "value": "-",
          "display": null,
        },
        {
          "label": "Agency",
          "value": "1",
          "display": null,
        },
        {
          "label": "Current Item C",
          "value": 0,
          "display": null,
        },
        {
          "label": "Total Programs Attended",
          "value": 0,
          "display": null,
        },
        {
          "label": "Waitlists on Record",
          "value": 0,
          "display": null,
        },
        {
          "label": "Total Registrations",
          "value": 0,
          "display": null,
        },
        {
          "label": "Money Owed",
          "value": 0,
          "display": null,
        },
        {
          "label": "Updated Date",
          "value": "2016-12-13T19:49:57Z",
          "display": null,
        },
        {
          "label": "Current Item A",
          "value": 0,
          "display": null,
        },
        {
          "label": "Manual Block",
          "value": "-",
          "display": null,
        },
        {
          "label": "Registrations on Record",
          "value": 0,
          "display": null,
        },
        {
          "label": "No. of Revisions",
          "value": "91",
          "display": null,
        },
        {
          "label": "Debit Balance",
          "value": 0,
          "display": null,
        },
        {
          "label": "Home Region",
          "value": "0",
          "display": null,
        },
        {
          "label": "Total Renewals",
          "value": 0,
          "display": null,
        },
        {
          "label": "Notice Preference",
          "value": "-",
          "display": null,
        },
        {
          "label": "Last Circ Activity",
          "value": "2016-12-13T19:49:57Z",
          "display": null,
        },
        {
          "label": "Birth Date",
          "value": "1972-05-13",
          "display": null,
        },
        {
          "label": "Current Checkouts",
          "value": 0,
          "display": null,
        },
        {
          "label": "Created Date",
          "value": "2015-09-03T14:16:20Z",
          "display": null,
        },
      ],
      "varFields": [
        {
          "fieldTag": "=",
          "marcTag": null,
          "ind1": null,
          "ind2": null,
          "content": "dkMaWkbhuEXG6",
          "subFields": null,
        },
        {
          "fieldTag": "b",
          "marcTag": null,
          "ind1": null,
          "ind2": null,
          "content": "23333097542730",
          "subFields": null,
        },
        {
          "fieldTag": "e",
          "marcTag": null,
          "ind1": null,
          "ind2": null,
          "content": "19839",
          "subFields": null,
        },
        {
          "fieldTag": "z",
          "marcTag": null,
          "ind1": null,
          "ind2": null,
          "content": "robkelley@nypl.org",
          "subFields": null,
        },
        {
          "fieldTag": "a",
          "marcTag": null,
          "ind1": null,
          "ind2": null,
          "content": "123 ANYSTREET AVE$ANYWHERE, NY 10308",
          "subFields": null,
        },
        {
          "fieldTag": "n",
          "marcTag": null,
          "ind1": null,
          "ind2": null,
          "content": "SMITH, THERESA",
          "subFields": null,
        },
      ],
    },
  },
  "count": 1,
  "statusCode": 200,
  "debugInfo": [],
};

// const mockErrorResponseData = {
//   "ErrorResponse": {
//     "properties": {
//         "statusCode": {
//           "type":"integer",
//           "format":"int32",
//         },
//         "type": {
//           "type":"string",
//           "example":"error_type",
//         },
//         "message": {
//           "type":"string",
//           "example":"Description of error",
//         },
//         "error": {
//           "type":"object",
//         },
//         "debugInfo": {
//           "type":"object",
//         }
//     },
//    "type": "object",
//    "name": "ErrorResponse",
//   },
// };

const mockErrorResponseData = {
  "data": {
    "expired": false,
    "statusCode": 400,
    "type": "exception",
    "message": "No response",
    "error": {
      "type": "NYPL\\Starter\\APIException",
      "code": 0,
      "message": "No response",
      "file": "/var/task/src/Controller/AuthController.php",
      "line": 47,
      "trace": [
        "#0 /var/task/src/Controller/AuthController.php(122): NYPL\\Services\\Controller\\AuthController->getTokenResponse('eyJ0eXAiOiJKV1Q...')",
        "#1 /var/task/index.php(260): NYPL\\Services\\Controller\\AuthController->getToken('eyJ0eXAiOiJKV1Q...')",
        "#2 [internal function]: Closure->{closure}(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Array)",
        "#3 /var/task/vendor/slim/slim/Slim/Handlers/Strategies/RequestResponse.php(41): call_user_func(Object(Closure), Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Array)",
        "#4 /var/task/vendor/slim/slim/Slim/Route.php(325): Slim\\Handlers\\Strategies\\RequestResponse->__invoke(Object(Closure), Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Array)",
        "#5 /var/task/vendor/slim/slim/Slim/MiddlewareAwareTrait.php(116): Slim\\Route->__invoke(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#6 /var/task/vendor/slim/slim/Slim/Route.php(297): Slim\\Route->callMiddlewareStack(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#7 /var/task/vendor/slim/slim/Slim/App.php(443): Slim\\Route->run(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#8 /var/task/vendor/nypl/microservice-starter/src/Service.php(63): Slim\\App->__invoke(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#9 [internal function]: NYPL\\Starter\\Service->NYPL\\Starter\\{closure}(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Object(NYPL\\Starter\\Service))",
        "#10 /var/task/vendor/slim/slim/Slim/DeferredCallable.php(43): call_user_func_array(Object(Closure), Array)",
        "#11 [internal function]: Slim\\DeferredCallable->__invoke(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Object(NYPL\\Starter\\Service))",
        "#12 /var/task/vendor/slim/slim/Slim/MiddlewareAwareTrait.php(67): call_user_func(Object(Slim\\DeferredCallable), Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Object(NYPL\\Starter\\Service))",
        "#13 /var/task/vendor/slim/slim/Slim/MiddlewareAwareTrait.php(116): Slim\\App->Slim\\{closure}(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#14 /var/task/vendor/slim/slim/Slim/App.php(337): Slim\\App->callMiddlewareStack(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#15 /var/task/vendor/slim/slim/Slim/App.php(298): Slim\\App->process(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#16 /var/task/index.php(333): Slim\\App->run()",
        "#17 {main}"
      ],
    },
    "debugInfo": [],
  },
};

const mockExpiredResponseData = {
  "data": {
    "expired": true,
    "statusCode": 401,
    "type": "exception",
    "message": "Expired token",
    "error": {
      "type": "NYPL\\Starter\\APIException",
      "code": 0,
      "message": "Expired token",
      "file": "/var/task/src/Controller/AuthController.php",
      "line": 47,
      "trace": [
        "#0 /var/task/src/Controller/AuthController.php(122): NYPL\\Services\\Controller\\AuthController->getTokenResponse('eyJ0eXAiOiJKV1Q...')",
        "#1 /var/task/index.php(260): NYPL\\Services\\Controller\\AuthController->getToken('eyJ0eXAiOiJKV1Q...')",
        "#2 [internal function]: Closure->{closure}(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Array)",
        "#3 /var/task/vendor/slim/slim/Slim/Handlers/Strategies/RequestResponse.php(41): call_user_func(Object(Closure), Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Array)",
        "#4 /var/task/vendor/slim/slim/Slim/Route.php(325): Slim\\Handlers\\Strategies\\RequestResponse->__invoke(Object(Closure), Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Array)",
        "#5 /var/task/vendor/slim/slim/Slim/MiddlewareAwareTrait.php(116): Slim\\Route->__invoke(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#6 /var/task/vendor/slim/slim/Slim/Route.php(297): Slim\\Route->callMiddlewareStack(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#7 /var/task/vendor/slim/slim/Slim/App.php(443): Slim\\Route->run(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#8 /var/task/vendor/nypl/microservice-starter/src/Service.php(63): Slim\\App->__invoke(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#9 [internal function]: NYPL\\Starter\\Service->NYPL\\Starter\\{closure}(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Object(NYPL\\Starter\\Service))",
        "#10 /var/task/vendor/slim/slim/Slim/DeferredCallable.php(43): call_user_func_array(Object(Closure), Array)",
        "#11 [internal function]: Slim\\DeferredCallable->__invoke(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Object(NYPL\\Starter\\Service))",
        "#12 /var/task/vendor/slim/slim/Slim/MiddlewareAwareTrait.php(67): call_user_func(Object(Slim\\DeferredCallable), Object(Slim\\Http\\Request), Object(Slim\\Http\\Response), Object(NYPL\\Starter\\Service))",
        "#13 /var/task/vendor/slim/slim/Slim/MiddlewareAwareTrait.php(116): Slim\\App->Slim\\{closure}(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#14 /var/task/vendor/slim/slim/Slim/App.php(337): Slim\\App->callMiddlewareStack(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#15 /var/task/vendor/slim/slim/Slim/App.php(298): Slim\\App->process(Object(Slim\\Http\\Request), Object(Slim\\Http\\Response))",
        "#16 /var/task/index.php(333): Slim\\App->run()",
        "#17 {main}"
      ],
    },
    "debugInfo": [],
  },
};

// const mockLoginCookie = '%7B%22access_token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ%22expires_in%22%3A3600%2C%22token_type%22%3A%22Bearer%22%2C%22scope%22%3A%22openid+offline_access+cookie+patron%3Aread%22%2C%22refresh_token%22%3A%2202b49603a8a2719389a6c77416b110675067827d%22%7D';

const mockLoginCookie = '123456';

export default {
  mockResponseData,
  mockErrorResponseData,
  mockExpiredResponseData,
  mockLoginCookie
};

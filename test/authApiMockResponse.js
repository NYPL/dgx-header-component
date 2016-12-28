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

const mockErrorResponseData = {
  "ErrorResponse": {
    "properties": {
        "statusCode": {
          "type":"integer",
          "format":"int32",
        },
        "type": {
          "type":"string",
          "example":"error_type",
        },
        "message": {
          "type":"string",
          "example":"Description of error",
        },
        "error": {
          "type":"object",
        },
        "debugInfo": {
          "type":"object",
        }
    },
   "type": "object",
   "name": "ErrorResponse",
  },
};

// const mockLoginCookie = '%7B%22access_token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ%22expires_in%22%3A3600%2C%22token_type%22%3A%22Bearer%22%2C%22scope%22%3A%22openid+offline_access+cookie+patron%3Aread%22%2C%22refresh_token%22%3A%2202b49603a8a2719389a6c77416b110675067827d%22%7D';

const mockLoginCookie = '123456';
export default { mockResponseData, mockErrorResponseData, mockLoginCookie };

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseURL : '/api/v1',
  AUTH_SERVER : "http://localhost:3000",
  //AUTH_SERVER : "http://10.138.39.235:3000",
  TOKEN : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InZ1dHRoaXBwIiwiZmlyc3ROYW1lIjoiVnV0dGhpcG9uZyIsImxhc3ROYW1lIjoiUGlwYXR0YW5hc2FrdWxraXQiLCJpYXQiOjE2NjY2OTM2MjIsImV4cCI6MTY2NjY5NDUyMn0.UK5j3H2A-HTX7aBR2VTQ44GB46dAjd1XLRxvDlNWET4',
  IDS_SAML_APP_CODE : 'VO',
  IDS_SAML_BASE_URL : '',
  IS_LOGIN_IDS_SAML : false,
  LOGIN_PAGE : 'https://localhost:4200/auth/login',
  IDS_SAML_LOGIN_CALLBACK : 'https://localhost:4200/VOAuthen/callback/login',
  IDS_SAML_LOGOUT_CALLBACK : 'https://localhost:4200/VOAuthen/callback/logout',
  IDS_SAML_CLIENT_ID : 'DgP4yW4jN5ptJR6fRIii_uv2LYca',
  IDS_SAML_ENPOINT_URL : 'https://test-ids.ais.co.th',
  IDS_SAML_URL_PATH : '/oauth2/',
  IDS_SAML_SERVICE : 'authorize',
  IDS_SAML_TOKEN_SERVICE : 'token',
  IDS_SAML_USERINFO_SERVICE : 'userinfo?schema=openid',
  IDS_SAML_BASIC_AUTHEN : 'RGdQNHlXNGpONXB0SlI2ZlJJaWlfdXYyTFljYTpXa1p4NWtRSzAzc2MxNTBxcWNLYm0weXp4Mllh',
  IDS_SAML_GRANT_TYPE : 'authorization_code'
  //IDS_SAML_PARAM_LOGIN : `?response_type=code&client_id=${this.IDS_SAML_CLIENT_ID}&redirect_uri='+this.ids_callbackurl+'&scope=openid`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

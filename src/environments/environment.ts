// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API : "https://api.nuevaerauruguay.com/api/",
  AuthAPI: 'https://api.nuevaerauruguay.com/api/auth/',
  urlPago: 'https://api.nuevaerauruguay.com/mercado-pago',
  urlFiles: 'https://api.nuevaerauruguay.com/storage/',

  // API : "http://apinuevaera.test/api/",
  // AuthAPI: 'http://apinuevaera.test/api/auth/',
  // urlPago: 'http://apinuevaera.test/mercado-pago',
  // urlFiles: 'http://apinuevaera.test/storage/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    // config của project
    apiKey: "AIzaSyD_GZCTGxqPd756XV12-bSlvwqXBAhcx5k",
    authDomain: "projectspring1-3a404.firebaseapp.com",
    projectId: "projectspring1-3a404",
    storageBucket: "projectspring1-3a404.appspot.com",
    messagingSenderId: "139714467302",
    appId: "1:139714467302:web:7f88912ff48a18839f3227",
    measurementId: "G-1FD5Y69Z9H",
    // địa chỉ database
    databaseURL: "gs://projectspring1-3a404.appspot.com"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

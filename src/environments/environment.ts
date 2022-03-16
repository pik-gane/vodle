// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "TRACE" // DEBUG or TRACE
      },
    ]  
  },
  data_service: {
    central_db_server_url: "http://localhost:5984/",
    central_db_password: "none",
    pwd_length: 12,
    hash_n_bytes: 8,
    pid_length: 6,
    oid_length: 4,
    vid_length: 2,
    did_length: 4,
    nid_length: 4
  },
  delegation: {
    max_weight: 3
  },
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle",
  magic_link_base_url: "http://localhost:8100/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: true
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

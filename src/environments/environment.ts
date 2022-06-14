/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  imprint_url: "./assets/impressum.html",
  privacy_statement_url: "./assets/datenschutz.html",
  privacy_statement_headline: "Formale Datenschutzerklärung und Nutzungs-Bedingungen",
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "TRACE" // DEBUG or TRACE
      },
    ]  
  },
  data_service: {
    central_db_server_url: "http://localhost:5984/", // use this if you want to use your local couchdb on localhost:5984 without proxy 
//    central_db_server_url: "http://localhost/couch/", // use this when you have an nginx docker container running that forwards requests to localhost/couch/ to localhost:5984 
//    central_db_server_url: "http://localhost:8100/couch/",  // use this when you don't have an nginx docker container doing that. in this case the angular dev server running on 8100 will do the forwarding to localhost:5984
    central_db_password: "none",
    allow_other_servers: false,
    hash_n_bytes: 8,
    pid_length: 6,
    pwd_length: 12,
    oid_length: 4,
    vid_length: 4,
    did_length: 4,
    nid_length: 4,
//  if a backdoor for law enforcement into the end-to-end encrypted data is required, uncomment:
//    backdoor_public_key: "ea17226c631a8a78c67626136d91980e82328b72e6b536c7df7e68fbb22c2aa7",
  },
  delegation: {
    max_weight: 3
  },
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle/",
  magic_link_base_url: "http://localhost:8100/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: true
  },
  closing: {
    grace_period_1_ms: 2000,
    grace_period_2_ms: 2000,
    grace_period_3_ms: 2000
  },
  max_len: {
    title: 200,
    name: 100,
    desc: 1000,
    url: 200
  },
  polls: {
    max_duration_days: 31,
    delete_after_days: 31
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

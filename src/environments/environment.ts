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
  privacy_statement_url: "", // empty = skip data protection check on login page (dev mode)
  privacy_statement_headline: "Formal Privacy Policy and Terms of Use",
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "TRACE" // DEBUG or TRACE
      },
    ]  
  },
  show_debug_info: true,
  // Toggle between Matrix and CouchDB backend
  // Set to true to use Matrix protocol, false to use CouchDB
  useMatrixBackend: true,
  matrix: {
    // Local Matrix homeserver URL for development
    homeserver_url: "http://localhost:8008",
    // The homeserver's server_name (permanent in a deployment: every user id
    // and room alias carries it); the development homeserver of
    // docker-compose.yml is "localhost"
    server_name: "localhost",
    // Enable Matrix E2EE (Olm/Megolm)
    /* Matrix end-to-end encryption. OFF, for two reasons of which the
       second would be enough on its own:
       - vodle gives every (poll, voter) its own Matrix account
         (pollAccountName), and the SDK's crypto store is one per browser
         profile and belongs to ONE account, so a POLL account can never
         have crypto at all. The person's own account still could — nothing
         stops the user room being encrypted — which is why this is a
         switch and not a deletion.
       - It would protect nothing. User data, poll data, options, ratings
         and delegations are all STATE events, which megolm never encrypts,
         and the only room ever created with m.room.encryption is the user
         room, whose payloads are state events too. What does protect the
         contents is vodle's own AES-GCM under the poll password and the
         user password, which is untouched by this.
       Turning it on costs every start a 5.4 MB WebAssembly download — 8.9 s
       on the owner's link — and buys published device keys (#327). */
    enable_e2ee: false,
    // Registration token (Synapse: registration_requires_token). vodle
    // registers a Matrix account per user implicitly; with a token, the
    // homeserver does not have to be open to anyone. The token is part of
    // the app bundle, so it deters drive-by registration bots, no more
    // (#327). Empty: open registration (m.login.dummy).
    registration_token: "",
    // Guard bot Matrix user ID — this bot is invited to all poll and voter
    // rooms with admin power (100). It monitors deadlines and closes rooms
    // by dropping all power levels to 0 when the deadline arrives, and lets
    // participants into the closed poll rooms. Empty: derived as
    // "@vodle-guard:" + server_name.
    // Server-side enforcement: the bot runs on the server, not in the client.
    guard_bot_user_id: "@vodle-guard:localhost",
    // How long a joiner waits for the guard bot to answer their knock on a
    // closed poll room (#328) before the join fails: the bot answers within
    // a second when it runs; the wait only ends by this timeout when it
    // does not.
    join_timeout_ms: 60000,
    // How many writes a second this client sends to the homeserver (#327).
    // Publishing a poll of fifty voters over five options is some 400 state
    // events; fired at once they empty the account's token bucket and every
    // one of them then retries against a bucket that is still empty. The
    // client therefore spaces its writes, and a refusal widens the spacing
    // further until the server accepts them again.
    //
    // Keep this at or below the homeserver's rc_message.per_second (the
    // deployment settings recommend 1000, deploy/homeserver.vodle.yaml). A
    // homeserver that rate-limits vodle's account not at all — see the
    // admin API's override_ratelimit in documentation/deployment/MATRIX.md
    // — can set 0 here, which turns the spacing off entirely.
    writes_per_second: 1000,
    // How many writes may go at once, before that rate applies at all. The
    // homeserver allows a burst of its own before its limit bites
    // (rc_message.burst_count, 20000 in the deployment settings), and vodle
    // has no reason to be slower than its server asked for: publishing a
    // poll of fifty voters over five options is some 450 writes, which fits
    // inside that burst and so goes at once. The rate above governs what
    // follows once the burst is spent. Keep this at or below the
    // homeserver's rc_message.burst_count.
    write_burst: 20000,
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
    // Matrix backend: poll membership keys and drafts are written to the
    // user room this long after the last change, coalesced (#330):
    matrix_user_data_delay_ms: 1000,
  },
  delegation: {
    enabled: false,
    max_weight: 3
  },
  no_more_options_time_fraction: 1/2,
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle/",
  magic_link_base_url: "http://localhost:4200/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: true
  },
  closing: {
    grace_period_1_ms: 3000,
    grace_period_2_ms: 3000,
    grace_period_3_ms: 3000,
    // Matrix backend (#325): how long a client waits for the guard bot to
    // close the poll on the server before closing it by convention, and
    // how often it looks:
    matrix_closure_timeout_ms: 120000,
    matrix_closure_poll_ms: 2000
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
  },
  // Handing this deployment over to another one, e.g. a CouchDB deployment
  // to its Matrix successor (documentation/deployment/MATRIX.md §6):
  handover: {
    // On the deployment being retired: new polls are no longer started
    // here. The "+" button, a new draft and the start of a draft show a
    // notice with this link instead; the polls that run here continue
    // until they end.
    successor_url: "",     // e.g. "https://matrix.vodle.it/#/"
    // On the successor: where the polls that started before the move live
    // on; shown on the "my polls" page. Empty once the predecessor is gone.
    predecessor_url: "",   // e.g. "https://app.vodle.it/#/"
  },
  hosting_institution: {
    name: "GitHub Pages",
    url: "https://pages.github.com/"
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

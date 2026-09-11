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

export const environment = {
  LEAVE_THIS_AS_THE_FIRST_ENTRY: true,
  // Important: leave the previous line exactly as it is!
  production: true,
  // a deployment serves its own privacy statement and imprint from
  // deploy/site/ (deploy/README.md): set the URLs to "./site/privacy.html"
  // and "./site/impressum.html" then. With a privacy statement the app asks
  // for the consent before it stores a vote; without one it asks nobody.
  imprint_url: null,
  privacy_statement_url: null,
//  imprint_url: "./site/impressum.html",
//  privacy_statement_url: "./site/privacy.html",
  privacy_statement_headline: "Formal Privacy Policy and Terms of Use",
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "ERROR"
      },
    ]  
  },
  show_debug_info: false, // must be false in production!
  // Toggle between Matrix and CouchDB backend
  // Set to true to use Matrix protocol, false to use CouchDB
  useMatrixBackend: true,
  matrix: {
    // In production, Matrix API is served via nginx reverse proxy on the
    // same origin. The browser talks to /_matrix/* which nginx forwards
    // to Synapse internally. The SDK uses this as the base URL and appends
    // /_matrix/client/... paths to it.  "/" (or any path, e.g. "/matrix")
    // means the origin the app is served from and is resolved against it at
    // start; override with the homeserver's own URL (e.g.
    // "https://matrix.vodle.example.org") when it is served elsewhere.
    homeserver_url: "/",
    // The homeserver's server_name — PERMANENT: every user id
    // (@<hash>:<server_name>) and every room alias carries it forever.
    // The deployment scripts (deploy/deploy.sh) take it from here and
    // refuse the placeholder.
    server_name: "vodle.example.com",
    // Enable Matrix E2EE (Olm/Megolm)
    enable_e2ee: true,
    // Registration token (Synapse: registration_requires_token). vodle
    // registers a Matrix account per user implicitly; with a token, the
    // homeserver does not have to be open to anyone. The token is part of
    // the app bundle, so it deters drive-by registration bots, no more
    // (#327). Empty: open registration (m.login.dummy).
    registration_token: "",
    // Guard bot Matrix user ID — this bot is invited to all poll and voter
    // rooms with admin power (100) for server-side deadline enforcement and
    // lets participants into the closed poll rooms. Empty: derived as
    // "@vodle-guard:" + server_name, which is what deploy/deploy.sh registers.
    guard_bot_user_id: "",
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
    // deployment settings recommend 20, deploy/homeserver.vodle.yaml). A
    // homeserver that rate-limits vodle's account not at all — see the
    // admin API's override_ratelimit in documentation/deployment/MATRIX.md
    // — can set 0 here, which turns the spacing off entirely.
    writes_per_second: 20,
    // How many writes may go at once, before that rate applies at all. The
    // homeserver allows a burst of its own before its limit bites
    // (rc_message.burst_count, 1000 in the deployment settings), and vodle
    // has no reason to be slower than its server asked for: publishing a
    // poll of fifty voters over five options is some 450 writes, which fits
    // inside that burst and so goes at once. The rate above governs what
    // follows once the burst is spent. Keep this at or below the
    // homeserver's rc_message.burst_count.
    write_burst: 1000,
  },
  data_service: {
    central_db_server_url: "https://sandstorm.pik-potsdam.de/couch/",
    central_db_password: "none",
    allow_other_servers: false,
    hash_n_bytes: 32,
    pid_length: 8,
    pwd_length: 16,
    oid_length: 4,
    vid_length: 8,
    did_length: 8,
    nid_length: 4,
//  if a backdoor for law enforcement into the end-to-end encrypted data is required, uncomment:
//    backdoor_public_key: "ea17226c631a8a78c67626136d91980e82328b72e6b536c7df7e68fbb22c2aa7",
    // Matrix backend: poll membership keys and drafts are written to the
    // user room this long after the last change, coalesced (#330):
    matrix_user_data_delay_ms: 1000,
  },
  delegation: {
    enabled: false,
    max_weight: 10
  },
  no_more_options_time_fraction: 1/2,
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle",
  // where the app is served: invitation links are built from this
  // ("https://" + server_name + "/#/" for the scripted deployment)
  magic_link_base_url: "https://sandstorm.pik-potsdam.de/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: false
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
    name: null,
    url: null
  },
  // Important: leave the next line exactly as it is!
  LEAVE_THIS_AS_THE_LAST_ENTRY: true
};

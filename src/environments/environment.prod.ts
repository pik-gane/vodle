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
  imprint_url: null,
  privacy_statement_url: null,
//  imprint_url: "./assets/impressum.html",
//  privacy_statement_url: "./assets/privacy.html",
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
  },
  delegation: {
    enabled: true,
    max_weight: 5,
    max_delegations: 3,
    weighted_epsilon: 1
  },
  no_more_options_time_fraction: 1/2,
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle",
  magic_link_base_url: "https://sandstorm.pik-potsdam.de/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: false
  },
  closing: {
    grace_period_1_ms: 3000,
    grace_period_2_ms: 3000,
    grace_period_3_ms: 3000
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
  hosting_institution: {
    name: null,
    url: null
  },
  // Important: leave the next line exactly as it is!
  LEAVE_THIS_AS_THE_LAST_ENTRY: true
};

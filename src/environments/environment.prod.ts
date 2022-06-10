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
  production: true,
  privacy_statement_url: "https://mensch72.github.io/assets/datenschutz.html",
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "ERROR"
      },
    ]  
  },
  data_service: {
    central_db_server_url: "https://sandstorm.pik-potsdam.de/couch/",
    central_db_password: "none",
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
    max_weight: 10
  },
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle",
//  magic_link_base_url: "https://sandstorm.pik-potsdam.de/#/",
//  magic_link_base_url: "https://pik-gane.github.io/vodle/#/",
  magic_link_base_url: "http://app.vodle.it/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: false
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

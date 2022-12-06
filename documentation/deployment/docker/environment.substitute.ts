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
/*
PLEASE ADJUST BEFORE USAGE AND REMOVE ALL COMMENTS!
*/
({
    production: true,
    imprint_url: "./assets/impressum.html", // ADJUST!
    privacy_statement_url: "./assets/privacy.html", // ADJUST!
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
      central_db_server_url: "https://sandstorm.pik-potsdam.de/couch/", // ADJUST!
      central_db_password: "none",
      allow_other_servers: false,
      hash_n_bytes: 32,
      pid_length: 8,
      pwd_length: 16,
      oid_length: 4,
      vid_length: 8,
      did_length: 8,
      nid_length: 4,
    },
    delegation: {
      enabled: false,
      max_weight: 10
    },
    db_put_retry_delay_ms: 100,
    default_lang: "en",
    github_url: "https://github.com/pik-gane/vodle", // ADJUST!
    magic_link_base_url: "https://sandstorm.pik-potsdam.de/#/", // ADJUST!
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
    }  
})
export const environment = {
  production: true,
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "INFO"
      },
    ]  
  },
  data_service: {
    central_db_server_url: "https://sandstorm.pik-potsdam.de/couch",
    central_db_password: "none",
    hash_n_bytes: 32,
    pid_length: 8,
    pwd_length: 16,
    oid_length: 4,
    vid_length: 8,
    did_length: 8,
    nid_length: 8
  },
  delegation: {
    max_weight: 10
  },
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle",
  magic_link_base_url: "https://sandstorm.pik-potsdam.de/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: false
  }
};

export const environment = {
  production: true,
  logging: {
    logLevels: [
      {
        loggerName: "root",
        logLevel: "WARN"
      },
    ]  
  },
  data_service: {
    central_db_server_url: "http://localhost:5984/vodle",
    central_db_password: "none"
  }
};

issue unassigned

on a "settings" page, user can edit:
- "email address"
- "password"
- "where to store my data" (`user_db`, using main vodle server's defaults): 
  - "database url" (domain[:port]/databasename)
  - "database username"
  - "database password"

settings are stored in `user_db` under filename = password-encrypted(email address) 

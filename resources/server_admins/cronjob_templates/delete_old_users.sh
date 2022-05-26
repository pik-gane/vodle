# CAUTION! This script contains couchdb admin credentials! So make it readable only for priviledged users such as root, and only use a priviledged user to execute the cron job!

# TODO: 
# 1. replace admin:password by actual couchdb admin credentials and adjust localhost:5984 to actual couchdb server URL:
curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle/_list/user_docs_by_last_access/user_last_access_doc_by_doc_id?include_docs=true&older_than=12" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
# 2. execute this as a cronjob once a day, e.g. by adding to your crontab:
# 0 5 * * 1-7 /path/to/delete_old_users.sh >/dev/null 2>&1

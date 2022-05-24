/**
 * List function that returns a json doc that can be passed to _purge 
 * in order to purge all user docs whose last_access is
 * between from (inclusive, optional) and before (exclusive) or older_than months old.
 * 
 * REQUEST PARAMETERS:
 * from (optional), before (optional): strings of the form "YYYY/MM"
 * older_than (optional): integer (months)
 * 
 * USAGE:
 * on the command line:
 * curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle_lists/_list/user_docs_by_last_access/user_last_access_doc_by_doc_id?include_docs=true&before=YYYY/MM" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
 * where `YYYY/MM` is the first month you want to *keep*,
 * or 
 * curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle_lists/_list/user_docs_by_last_access/user_last_access_doc_by_doc_id?include_docs=true&older_than=X" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
 * where `X` is the number of months you want to keep user data.
 * 
 * Note that this will NOT delete these docs from any user device, since the purge is not replicated to these devices!
 */
function (head, req) {
    var headers = {'Content-Type': 'application/json'};
    var result;
    if (req.query.include_docs != 'true') {
      start({'code': 400, headers: headers});
      result = {'error': 'I require include_docs=true'};
    } else if (!req.query.before && !req.query.older_than) {
      start({'code': 400, headers: headers});
      result = {'error': 'I require before=YYYY/MM or older_than=X'};
    } else {
      start({'headers': headers});
      var before2 = null;
      if (req.query.older_than) {
        var now = new Date(),
            now_absmonth = now.getUTCFullYear()*12 + now.getUTCMonth(),
            before_absmonth = now_absmonth - req.query.older_than,
            before_month = before_absmonth%12,
            before_year = (before_absmonth - before_month) / 12;
        before2 = ''+before_year+'/'+String(before_month+1).padStart(2, '0');
      }
      result = {};
      while(row = getRow()) {
        if (row.doc && row.doc.value) {
            if (!!req.query.from && row.doc.value < req.query.from) continue;
            if (!!req.query.before && row.doc.value >= req.query.before) continue;
            if (!!req.query.older_than && row.doc.value >= before2) continue;
            result[row.id] = [row.key]; // row.key contains the _rev of the doc!
        }
      }
    }
    send(JSON.stringify(result));
  }
  
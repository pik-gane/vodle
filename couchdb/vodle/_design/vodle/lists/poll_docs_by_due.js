/**
 * List function that returns a json doc that can be passed to _purge 
 * in order to purge all poll docs whose poll has a due date 
 * between from (inclusive, optional) and before (exclusive).
 * 
 * REQUEST PARAMETERS:
 * from (optional), before (optional): strings of the form "YYYY-MM-DD"
 * older_than (optional): integer (days)
 * 
 * USAGE:
 * on the command line:
 * curl -X GET "http://admin:password@localhost:5984/vodle/_design/vodle/_list/poll_docs_by_due/poll_due_doc_by_doc_id?include_docs=true&before=YYYY-MM-DD" | curl -X POST --data-binary @- -H 'Content-Type: application/json' "http://admin:password@localhost:5984/vodle/_purge"
 *  where `YYYY-MM-DD` is the first due date you want to *keep*.
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
      result = {'error': 'I require before=YYYY-MM-DD or older_than=X'};
    } else {
      start({'headers': headers});
      var before2 = null;
      if (req.query.older_than) {
        var now_as_ms = (new Date()).getTime(),
            before_as_ms = now_as_ms - req.query.older_than*24*60*60*1000;
        before2 = (new Date(before_as_ms)).toISOString();
      }
      result = {};
      while(row = getRow()) {
        if (row.doc && row.doc.value) {
            if (req.query.from && row.doc.value < req.query.from) continue;
            if (req.query.before && row.doc.value >= req.query.before) continue;
            if (req.query.older_than && row.doc.value >= before2) continue;
            result[row.id] = [row.key]; // row.key contains the _rev of the doc!
        }
      }
    }
    send(JSON.stringify(result));
  }
  
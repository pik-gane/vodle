/**
 * List function that returns a json doc that can be passed to _purge 
 * in order to purge all poll docs whose poll has a due date 
 * between from (inclusive, optional) and before (exclusive).
 * 
 * REQUEST PARAMETERS:
 * from, before: strings of the form "YYYY-MM-DD"
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
    } else if (!req.query.before) {
      start({'code': 400, headers: headers});
      result = {'error': 'I require before=YYYY-MM-DD'};
    } else {
      start({'headers': headers});
      result = {};
      while(row = getRow()) {
        if (row.doc && row.doc.value) {
            if (req.query.from && row.doc.value < req.query.from) continue;
            if (row.doc.value >= req.query.before) continue;
            result[row.id] = [row.key]; // row.key contains the _rev of the doc!
        }
      }
    }
    send(JSON.stringify(result));
  }
  
/**
 * helper view for lists/poll_docs_by_due
 */
function(doc) {
    const userprefix = "~vodle.user.", pollprefix = "~vodle.poll.";
    let _id = doc._id;
    if (_id.startsWith(pollprefix)) {
        var end = _id.slice(pollprefix.length),
            pos_par = end.indexOf('§'),
            pos_dot = end.indexOf('.'),
            pos = end.includes('.') ? Math.min(pos_par,pos_dot) : pos_par,
            pid = end.slice(0, pos),
            due_doc_id = pollprefix + pid + "§due";
        emit(doc._rev, {_id: due_doc_id});
    } else if (_id.startsWith(userprefix)) {
        var pos_par = _id.indexOf('§'),
            key = _id.slice(pos_par+1);
        if (key.startsWith('poll.')) {
            var end = key.slice('poll.'.length),
                pos = end.indexOf('.')
                pid = end.slice(0, pos),
                due_doc_id = pollprefix + pid + "§due";
            emit(doc._rev, {_id: due_doc_id});
        }
    }
}
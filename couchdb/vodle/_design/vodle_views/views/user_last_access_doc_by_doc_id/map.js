/**
 * helper view for lists/user_docs_by_last_access
 */
function(doc) {
    const userprefix = "~vodle.user.";
    let _id = doc._id;
    if (_id.startsWith(userprefix)) {
        var end = _id.slice(userprefix.length),
            pos = end.indexOf('§')
            uid = end.slice(0, pos),
            last_access_doc_id = userprefix + uid + "§last_access";
        emit(doc._rev, {_id: last_access_doc_id});
    }
}
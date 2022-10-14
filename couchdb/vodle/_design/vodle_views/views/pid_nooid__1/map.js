/**
 * create a list of ones by poll id, one per option
 * curl -X GET http://vodle:none@127.0.0.1:5984/vodle/_design/vodle_views/_view/pid_nooid__1?group_level=1
 */
function(doc) {
    const pollprefix = "~vodle.poll.", optionnamesuffix = ".name";
    let _id = doc._id;
    if (_id.startsWith(pollprefix) && _id.endsWith(optionnamesuffix)) {
        let end = _id.slice(pollprefix.length),
            pos_par = end.indexOf('§'),
            pos_dot = end.indexOf('.'),
            pos = end.includes('.') ? Math.min(pos_par,pos_dot) : pos_par,
            pid = end.slice(0, pos);
        emit(pid, [1]);
    }
}
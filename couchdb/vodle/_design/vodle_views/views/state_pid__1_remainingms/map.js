/**
 * create a list of state and remaining ms by poll id, grouped by state
 * curl -X GET http://vodle:none@127.0.0.1:5984/vodle/_design/vodle_views/_view/state_pid__1_remainingms?group_level=1
 */
function(doc) {
    const pollprefix = "~vodle.poll.", statesuffix = "§state";
    let _id = doc._id;
    if (_id.startsWith(pollprefix) && _id.endsWith(statesuffix)) {
        let end = _id.slice(pollprefix.length),
            pos_par = end.indexOf('§'),
            pos_dot = end.indexOf('.'),
            pos = end.includes('.') ? Math.min(pos_par,pos_dot) : pos_par,
            pid = end.slice(0, pos),
            now_ms = (new Date()).getTime(),
            due_ms = (new Date(doc.due)).getTime(),
            state = (now_ms > due_ms) ? "closed" : "running",
            remaining_ms = due_ms - now_ms;
        emit([state, pid], [1, remaining_ms]);
    }
}
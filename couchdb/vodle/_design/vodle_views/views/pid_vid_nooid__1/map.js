/**
 * create a list of ones by poll id and voter id, one per rated option
 * curl -X GET http://vodle:none@127.0.0.1:5984/vodle/_design/vodle_views/_view/pid_vid_nooid__1?group_level=2
 */
function(doc) {
    const pollprefix = "~vodle.poll.", votermidfix = ".voter.";
    let _id = doc._id;
    if (_id.startsWith(pollprefix) && _id.includes(votermidfix)) {
        let end = _id.slice(pollprefix.length),
            pos_par = end.indexOf('§'),
            pos_dot = end.indexOf('.'),
            pos = end.includes('.') ? Math.min(pos_par,pos_dot) : pos_par,
            pid = end.slice(0, pos),
            pos_vid = end.indexOf(votermidfix) + votermidfix.length,
            end2 = end.slice(pos_vid),
            pos_par2 = end2.indexOf('§'),
            vid = end2.slice(0, pos_par2);
        emit([pid, vid], [1]);
    }
}
/*
UNFORTUNATELY THE FOLLOWING DOES NOT WORK since the output of an update function is passed through validate_doc_update.

function(doc, request) {
    // check whether doc contains a due date:
    let _id = doc._id, pos = _id.indexOf('/');
    if ((_id[0] == '~') && (pos != -1) && (_id.endsWith('/due'))) {
        // verify caller is owner:
        let username = _id.slice(1, pos);
        if (!(username == request.userCtx.name)) {
            return [null, 'Only poll user may call make_surprise'];
        }
        // check whether due date is past:
        if (doc.value) {
            try {
                let due = new Date(doc.value), now = new Date();
                if (now < due) {
                    return [null, 'Surprise not due.'];
                } else {
                    // Try to generate the surprise doc with a random value:
                    let surprise_id = _id.slice(0, _id.lastIndexOf('/')) + '/surprise';
                    return [{ _id: surprise_id, value: Math.random() }, 
                            "Trying to make new surprise. Will fail if surprise exists already."];
                    // If a surprise doc exists already (which we can't check here),
                    // this update will fail because we're not giving the correct _ref,
                    // and the existing doc will prevail.
                }
            } catch {
                return [null, 'Invalid due date.'];
            }
        } else {
            return [null, 'Missing due date.'];
        }
    }
}
*/
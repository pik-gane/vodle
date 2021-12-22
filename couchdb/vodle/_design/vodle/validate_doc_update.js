function (newDoc, savedDoc, userCtx) {
    if (!(userCtx.name == "admin")) {
        const userprefix = "~vodle.user.", pollprefix = "~vodle.poll.";
        let _id = newDoc._id;
        if (_id.startsWith(userprefix)) {
            // let only the owner create, update, or delete it:
            if (!_id.startsWith("~" + userCtx.name +":")) {
                throw ({forbidden: 'Only the owner of a user document _id may update it.'});
            }
        } else if (_id.startsWith(pollprefix)) {
            if (_id.includes('.voter.')) {
                // it's a voter doc.
                // let only the owner create, update, or delete it:
                if (!_id.startsWith("~" + userCtx.name +":")) {
                    throw ({forbidden: 'Only the owner of a voter document _id may update it.'});
                }
            } else {
                // it's a poll doc.
                // if it already exists, let noone update or delete it:
                if (savedDoc) {
                    throw ({forbidden: 'Noone may update or delete existing poll documents.'})
                }
                // let only the voters create it:
                let doc_pid = _id.substring(pollprefix.length, _id.indexOf(':')); 
                if (!userCtx.name.startsWith("vodle.poll." + doc_pid +".voter.")) {
                    throw ({forbidden: 'Only voters in a poll may create poll documents.'});
                }
            }
        }
    }
}
function (newDoc, savedDoc, userCtx) {
    if (!(userCtx.name == "admin")) {
        const userprefix = "~vodle.user.", pollprefix = "~vodle.poll.", voterprefix = "~vodle.voter.";
        let _id = newDoc._id;
        if (_id.startsWith(userprefix)) {
            // let only the owner create, update, or delete it:
            if (!_id.startsWith(userprefix + userCtx.name)) {
                throw ({forbidden: 'Only the owner of a user document _id may update it.'});
            }
        } else if (_id.startsWith(voterprefix)) {
            // let only the owner create, update, or delete it:
            if (!_id.startsWith(voterprefix + userCtx.name)) {
                throw ({forbidden: 'Only the owner of a voter document _id may update it.'});
            }
        } else if (_id.startsWith(pollprefix)) {
            // let only the owner create it:
            if (!_id.startsWith(pollprefix + userCtx.name)) {
                throw ({forbidden: 'Only the owner of a poll document _id may create it.'});
            }
            // if it already exists, let noone update or delete it:
            if (savedDoc) {
                throw ({forbidden: 'Noone may update or delete existing poll documents.'})
            }
        }
    }
}
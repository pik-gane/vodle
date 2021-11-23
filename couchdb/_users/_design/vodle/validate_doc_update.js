function(newDoc, savedDoc, userCtx) {
    // restrict permissions so that only "vodle" can create users,
    // a user can only update their own user doc,
    // but "vodle" cannot even do that (so that no-one can change this shared user's password!):
    if (!(userCtx.name == "admin")) {
        // restrict what others than "admin" can do:
        if (!savedDoc) {
            // Attempt to create new doc
            // Make sure only "vodle" can do this:
            if (!(userCtx.name == "vodle")) {
                throw ({forbidden: 'Only users "admin" and "vodle" may create new users.'});
            }
            // Make sure new doc is a user doc whose name begins with "vodle.":
            if (!newDoc._id.startsWith("org.couchdb.user:vodle.")) {
                throw ({forbidden: 'New usernames must start with "vodle.".'});
            }
        } else if (!newDoc) {
            // Attempt to delete existing doc
            // Make sure only the user themself can do this to her user doc:
            if (!(savedDoc._id == "org.couchdb.user:"+userCtx.name)) {
                throw ({forbidden: 'Users may only delete their own user document.'});
            }
            // Make sure special user "vodle" can NOT delete their own document:
            if (userCtx.name == "vodle") {
                throw ({forbidden: 'User "vodle" may not delete any user document.'});
            }
        } else {
            // Attempt to delete or update existing doc
            // Make sure only the user themself can do this to her user doc:
            if (!(newDoc._id == "org.couchdb.user:"+userCtx.name)) {
                throw ({forbidden: 'Users may only delete or update their own user document.'});
            }
            // Make sure special user "vodle" can NOT update their own user document:
            if (userCtx.name == "vodle") {
                throw ({forbidden: 'User "vodle" may not delete or update any user document.'});
            }
            // Make sure poll users "vodle.poll.XXX" can NOT update their own user documents either:
            if (userCtx.name.beginsWith("vodle.poll.") && !userCtx.name.includes(".voter.")) {
                throw ({forbidden: 'Poll users "vodle.poll.XXX" may not delete or update any user document.'});
            }
        }
    }
}
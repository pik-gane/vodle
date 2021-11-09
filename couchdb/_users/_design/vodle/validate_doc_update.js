function(newDoc, savedDoc, userCtx) {
    // restrict permissions so that only "vodle" can create users,
    // a user can only update their own user doc,
    // but "vodle" cannot even do that (so that no-one can change this shared user's password!):
    if (!savedDoc) {
        // Attempt to create new user
        // Make sure only "vodle" can do this:
        if (!(userCtx.name == "vodle")) {
            throw ({forbidden: 'Only user "vodle" may create new users.'});
        }
        // Make sure new username begins with "vodle.":
        if (!newDoc.name.startsWith("vodle.")) {
            throw ({forbidden: 'New usernames must start with "vodle.".'});
        }
    } else if (!newDoc) {
        // Attempt to delete existing user
        // Make sure only the user themself can do this:
        if (!(savedDoc._id == "org.couchdb.user:"+userCtx.name)) {
            throw ({forbidden: 'Users may only delete their own user document.'});
        }
        // Make sure special user "vodle" can NOT delete their own document:
        if (userCtx.name == "vodle") {
            throw ({forbidden: 'User "vodle" may not delete any user document.'});
        }
    } else {
        // Attempt to delete or update existing user
        // Make sure only the user themself can do this:
        if (!(newDoc._id == "org.couchdb.user:"+userCtx.name)) {
            throw ({forbidden: 'Users may only delete or update their own user document.'});
        }
        // Make sure special user "vodle" can NOT update their own document:
        if (userCtx.name == "vodle") {
            throw ({forbidden: 'User "vodle" may not delete or update any user document.'});
        }
    }
}
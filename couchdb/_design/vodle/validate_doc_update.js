function(newDoc, savedDoc, userCtx) {
    // check whether doc is in some user's "folder":
    let _id = newDoc._id, pos = _id.indexOf('/');
    if ((_id[0] == '~') && (pos != -1)) {
        // let only that user update it:
        let username = _id.slice(1, pos);
        if (username != userCtx.name) {
            throw ({unauthorized: 'Only the owner of this document may update it.'}) // or forbidden to avoid popups?
        }
        // check whether it's an existing poll doc:
        if (savedDoc && _id.startsWith('~vodle.polls.')) {
            // prevent update since poll data must not be altered once created:
            throw ({forbidden: 'Noone may change existing poll data.'})
        }
        // check whether it's a surprise doc:
        if (_id == '~'+username+'/surprise') {
            // prevent update since surprise docs are controlled by update functions only:
            throw ({forbidden: 'Noone may create or update a surprise.'})
        }
    }
}
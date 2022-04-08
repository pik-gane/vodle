function (doc, req) {
    return (
        doc._id === '_design/vodle' 
        || ((req.query.start1 <= doc._id) && (doc._id < req.query.end1))
        || ((req.query.start2 <= doc._id) && (doc._id < req.query.end2))
    );
}
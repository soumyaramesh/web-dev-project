var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    commentbody: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    upvotes: { type: Number, default: 0 },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'PostModel' }
});


var CommentModel = mongoose.model('CommentModel', CommentSchema);


//var comment1 = new CommentModel({ commentbody: "comment1forpost1auth1", author: "55160ee359218c9020773463", upvotes: "0", post: "55160feaee0b78102d961a1b" });
//comment1.save();

//var comment2 = new CommentModel({ commentbody: "comment2forpost1auth1", author: "55160ee359218c9020773463", upvotes: "2", post: "55160feaee0b78102d961a1b" });
//comment2.save();

//var comment3 = new CommentModel({ commentbody: "comment3forpost1auth2", author: "55160ee359218c9020773464", upvotes: "1", post: "55160feaee0b78102d961a1b" });
//comment3.save();

//var comment4 = new CommentModel({ commentbody: "comment1forpost2auth3", author: "55160ee359218c9020773465", upvotes: "1", post: "55160feaee0b78102d961a1c" });
//comment4.save();

//var comment5 = new CommentModel({ commentbody: "comment2forpost2auth2", author: "55160ee359218c9020773464", upvotes: "7", post: "55160feaee0b78102d961a1c" });
//comment5.save();

exports.load = function (app, public_path) {

    app.get("/comment/:id", function (req, res) {
        CommentModel.findById(req.params.id).populate('author').exec(function (err, post) {
            res.json(comment);
        });
    });

    
}
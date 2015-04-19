var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    upvotes: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: 'TagModel' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' }],
});

var PostModel = mongoose.model('PostModel', PostSchema);
//var UserModel = mongoose.model('UserModel');

//var post1 = new PostModel({ title: "post1", content: "post1content", upvotes: "3", author: "55160ee359218c9020773463", tag: "tag1" });
//post1.save();

//var post2 = new PostModel({ title: "post2", content: "post2content", upvotes: "0", author:"55160ee359218c9020773463" , tag: "tag2" });
//post2.save();

//var post3 = new PostModel({ title: "post3", content: "post3content", upvotes: "1", author: "55160ee359218c9020773465", tag: "tag2" });
//post3.save();

//var post4 = new PostModel({ title: "post4", content: "post4content", upvotes: "2", author: "55160ee359218c9020773466", tag: "tag3" });
//post4.save();

exports.load = function (app, public_path) {
    app.get("/rest/posts", function (req, res) {
        PostModel.find().populate('author').populate('tag').populate('comments').exec(function (err, posts) {
            res.json(posts);
        });
    });

    

    app.get("/post/:content/comments", function (req, res) {
        PostModel.find({ content: req.params.content }, (function (err, post) {
            res.json(post);
            
        })
        )
    });

    app.get("/post/tag/:id", function (req, res) {
        PostModel.find({tag:req.params.id}).populate('tag').populate('author').exec(function(err,tagposts) {
            res.json(tagposts);
        })
    })

    app.get("/post/:id", function (req, res) {
        PostModel.findById(req.params.id).populate('author').populate('tag').populate('comments').exec(function (err, post) {
            var options = {
                path: 'comments.author',
                model: 'UserModel'
            };
            PostModel.populate(post, options, function (err, data) {
                res.json(data);
            })
           
        });
    });

    app.get('/rest/:userid/posts', function (req, res) {
        PostModel.find({ author: req.params.userid }).populate('author').populate('tag').exec(function (err, userposts) {
            var options2 = {
                path: 'author.following',
                model: 'UserModel'
            };
            PostModel.populate(userposts, options2, function (err, data) {
                res.json(data);
            })
            
        });
    });

    app.get('/post/unpopulated/:id', function (req, res) {
        PostModel.findById(req.params.id, function (err, data) {
            res.json(data);
        });
    });

   
    
    
}

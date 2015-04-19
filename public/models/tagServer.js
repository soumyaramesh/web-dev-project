var mongoose = require('mongoose');


var TagSchema = new mongoose.Schema({
    tag: { type: String, lowercase: true, unique: true }
});

var TagModel=mongoose.model('TagModel', TagSchema);

//var t1 = new TagModel({ tag: "tag1" });
//t1.save();

//var t2 = new TagModel({ tag: "tag2" });
//t2.save();

//var t3 = new TagModel({ tag: "tag3" });
//t3.save();

exports.load = function (app, public_path) {
    app.get("/rest/tags", function (req, res) {
        TagModel.find(function (err, tags) {
            res.json(tags);
        });
    });

    app.get("/rest/tag/:id", function (req, res) {
        TagModel.findById(req.params.id, function (err, tag) {
            res.json(tag);
        });
    });

    app.get('/tagname/:id', function (req, res) {
        TagModel.findOne({ _id: req.params.id }, function (err, tag) {
            res.json(tag.tag);
        })
    })
}
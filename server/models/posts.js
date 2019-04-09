var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  url: String,
  description: String,
  date: Date,
  likes: [String]
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  url: String,
  description: String,
  likes: Number,
  date: Date
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
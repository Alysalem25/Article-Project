const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" , required : true}, // Reference to the Article model
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required : true }, // Reference to the User model
    likes: { type: Number, default: 0 }, // Number of likes for the comment
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the comment
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who replied
        content: { type: String, required: true }, // Reply text
        createdAt: { type: Date, default: Date.now }, // Timestamp for replies
      },
    ],
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
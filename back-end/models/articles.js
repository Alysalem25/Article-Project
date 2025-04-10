const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    topic: {
        type: String,
        required: true,
        enum: ["لغه", "موسيقي", "فلسفه", "قرائه", "أدب", "فن"]
    },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "published", "rejected"]
    },
    imageUrl: { type: String }, // Add this field
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
    note: { type: String },
    // author_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    deletedAt: { type: Date, index: { expires: '24h' }, default: null } // TTL index
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
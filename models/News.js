const mongoose = require("mongoose");
const schema =  mongoose.Schema;

const NewsSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = News = mongoose.model("news", NewsSchema);

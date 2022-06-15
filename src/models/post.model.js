const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
    },
    postContent: {
        type: String,
        required: true,
    },
    postTag: {
        type: String,
    },
    image: {
        type: String,
    }
},
{timestamps: true }

)

module.exports = mongoose.model("post", postSchema)
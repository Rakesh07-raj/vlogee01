const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blog'
    }

}, { timestamps: true })

const Comments = model('comments', commentsSchema);

module.exports = Comments;
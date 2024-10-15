// postSchema.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
    title: string;
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving
postSchema.pre<IPost>('save', function (next) {
    this.updatedAt = new Date(); // Change to create a Date object
    next();
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;

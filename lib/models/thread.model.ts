import mongoose from "mongoose";

// main thread as parent, with comments on the parent as children
const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    // reference itself, so that that children can be a parent that has children of its own
    // e.g comment reply to a comment on a thread
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;

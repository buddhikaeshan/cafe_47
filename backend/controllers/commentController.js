import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";

const addComment = async (req, res) => {
    const { comment, rating } = req.body;
    try {
        if (rating < 1 || rating > 5) {
            return res.json({ success: false, message: "Rating must be between 1 and 5" });
        }
        const user = await userModel.findById(req.body.userId).select('name');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const newComment = new commentModel({
            name: user.name, // Fetch name from user document
            comment,
            rating,
            status: "pending"
        });
        await newComment.save();
        res.json({ success: true, message: "Comment Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const listComment = async (req, res) => {
    try {
        const comments = await commentModel.find({});
        res.json({ success: true, data: comments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const updateCommentStatus = async (req, res) => {
    const { commentId, status } = req.body;
    try {

        const comment = await commentModel.findByIdAndUpdate(
            commentId,
            { status },
        );

        if (!comment) {
            return res.json({ success: false, message: "Comment not found" });
        }

        res.json({ success: true, message: "Status updated", data: comment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addComment, listComment, updateCommentStatus };
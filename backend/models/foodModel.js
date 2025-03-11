import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: false },
    type: { type: String, require: true },
    size: { type: String, require: false },
    status: { type: String, require: false },
    startDate: { type: Date, require: false },
    endDate: { type: Date, require: false },
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
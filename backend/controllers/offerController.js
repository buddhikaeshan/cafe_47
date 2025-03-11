import offerModel from "../models/foodModel.js";
import fs from 'fs'

//add
const addOffer = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const offer = new offerModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        status:req.body.type,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        type:req.body.type,
        image: image_filename
    })
    try {
        await offer.save();
        res.json({ success: true, message: "Offer Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

//all food list
const listOffer = async (req, res) => {
    try {
        const offer = await offerModel.find({});
        res.json({ success: true, data: offer })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Update food
const updateOffer = async (req, res) => {
    const offerId = req.params.id;

    try {
        // Prepare update data
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        };

        // If a new image is uploaded, handle it
        if (req.file) {
            updateData.image = req.file.filename; // Use the new image filename
        }

        // Update the food item in the database
        const updatedOffer = await offerModel.findByIdAndUpdate(offerId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
        });

        if (updatedOffer) {
            res.json({ success: true, message: "offer updated", data: updatedOffer });
        } else {
            res.json({ success: false, message: "offer not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating Offer item" });
    }
};

//remove food 
const removeOffer = async (req, res) => {
    try {
        const offer = await offerModel.findById(req.body.id);
        fs.unlink(`uploads/${offer.image}`, () => { })

        await offerModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"offer Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updateOfferStatus = async (req, res) => {
    const offerId = req.params.offerId;
    try {
        const updateData = {
            status: req.body.status,
        };
        await offerModel.findByIdAndUpdate(offerId, updateData, { new: true });
        res.json({ success: true, message: "Status Update" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating Offer item" });
    }
};

export { addOffer, listOffer, removeOffer,updateOffer,updateOfferStatus }
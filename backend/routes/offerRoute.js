import express from "express"
import {addOffer, listOffer, removeOffer,updateOffer,updateOfferStatus } from "../controllers/offerController.js"
import multer from "multer"

const offerRouter = express.Router();

//image storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const uplode = multer({ storage: storage })

offerRouter.post("/add", uplode.single("image"), addOffer);
offerRouter.get("/list",listOffer);
offerRouter.post("/remove",removeOffer);
offerRouter.put("/update/:id", uplode.single("image"), updateOffer);
offerRouter.put("/updateStatus/:offerId", updateOfferStatus);

export default offerRouter;

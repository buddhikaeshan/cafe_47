import userModel from "../models/userModel.js"

//add item to cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        const cartKey = `${req.body.itemId}-${req.body.size}`; // Create composite key

        if (!cartData[cartKey]) {
            cartData[cartKey] = { quantity: 1, size: req.body.size };
        } else {
            cartData[cartKey].quantity += 1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        const cartKey = `${req.body.itemId}-${req.body.size}`;

        if (cartData[cartKey] && cartData[cartKey].quantity > 0) {
            cartData[cartKey].quantity -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Remove Error" });
    }
};

//fetch cart data
const getCart = async (req, res) => {
    try {
        let userData =await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { addToCart, removeFromCart, getCart }
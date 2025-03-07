import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:3000"


    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            item: req.body.item,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.item.map((item) => ({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 100 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in VerifyOrder" })
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error in list order" })
    }
}

//api for order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Update" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const token = req.headers.token;

        // Add token verification here if you're using JWT
        // For example:
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // if (!decoded) {
        //     return res.status(401).json({ success: false, message: "Unauthorized" });
        // }

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if order can be cancelled
        if (order.status === "Delivered" || order.status === "Canceled") {
            return res.status(400).json({ success: false, message: "Order cannot be canceled" });
        }

        // Update order status
        order.status = "Canceled";
        await order.save();

        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
        console.error("Cancel order error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error while cancelling order",
            error: error.message 
        });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, cancelOrder };
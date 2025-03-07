import express from 'express'
import authMiddeleware from '../middleware/auth.js'
import {cancelOrder, listOrders, placeOrder, updateStatus, userOrders, verifyOrder} from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js';

const orderRouter=express.Router();

orderRouter.post("/place",authMiddeleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get('/list',listOrders )
orderRouter.post('/status',updateStatus)
orderRouter.post('/cancel',cancelOrder)


export default orderRouter;
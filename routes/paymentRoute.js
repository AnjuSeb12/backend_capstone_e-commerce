import express from "express"
import { allorderView, orderAdding, orderDelete, orderViewById, verifyPayment } from "../controllers/orderController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";




const paymentRouter=express.Router()


paymentRouter.post('/orders',authenticateUser, orderAdding);


paymentRouter.post('/verify-payment',authenticateUser, verifyPayment);


paymentRouter.get('/orders',authenticateAdmin,allorderView);

paymentRouter.get('/orders/:userId/:orderId', authenticateUser,orderViewById);


paymentRouter.delete('/orders/:id', authenticateUser,orderDelete);


export default paymentRouter;

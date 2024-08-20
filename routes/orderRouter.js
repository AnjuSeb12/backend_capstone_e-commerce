import express from "express"
import { allOrderView, cancelPayment, orderAdding, orderDelete, orderViewById,verifyPayment} from "../controllers/orderController.js"
import authenticateUser from "../middlewares/userMiddleware.js";





const orderRouter=express.Router()


orderRouter.post('/add', authenticateUser, orderAdding);


orderRouter.post('/verify-payment', authenticateUser, verifyPayment);


orderRouter.get('/all', authenticateUser, allOrderView);


orderRouter.get('/:orderId', authenticateUser, orderViewById);


orderRouter.delete('/:id', authenticateUser, orderDelete);

orderRouter.post('/cancel',cancelPayment)



export default orderRouter
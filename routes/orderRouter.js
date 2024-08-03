import express from "express"
import { allorderView, OrderAdding, orderDelete, orderViewById} from "../controllers/orderController.js"
import authenticateSeller from "../middlewares/sellerMiddleware.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";



const orderRouter=express.Router()
orderRouter.post("/addorder/:userId",authenticateUser,OrderAdding);
orderRouter.get("/getorder",authenticateAdmin,allorderView);
orderRouter.get("/getorderbyid/:userId/:orderId",authenticateUser,orderViewById)
orderRouter.delete("/deleteorder/:id",authenticateAdmin,orderDelete)

// orderRouter.get('/orders/:userId/:orderId', getOrderById);




export default orderRouter
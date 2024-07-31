import express from "express"
import { allorderView, OrderAdding, orderDelete, orderViewById } from "../controllers/orderController"


const orderRouter=express.Router()
orderRouter.post("/addorder",OrderAdding);
orderRouter.get("/getorder",allorderView);
orderRouter.get("/getorderbyid/:id",orderViewById)
orderRouter.delete("/deleteorder/:id",orderDelete)





export default orderRouter
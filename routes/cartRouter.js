import express from 'express';
import { cartAdding, cartDelete, cartUpdate, cartViewById } from '../controllers/cartController.js';
import authenticateUser from '../middlewares/userMiddleware.js';





const cartRouter = express.Router();



cartRouter.post("/addcart/:userid",authenticateUser,cartAdding);
cartRouter.get("/viewbyidcart/:userid",authenticateUser,cartViewById);
cartRouter.put("/updatecart/:userId/:cartItemId",authenticateUser,cartUpdate);
cartRouter.delete("/cartdelete/:userId/:cartItemId",authenticateUser,cartDelete);


export default cartRouter;
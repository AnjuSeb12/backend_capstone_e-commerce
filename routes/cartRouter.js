import express from 'express';
import { cartAdding, cartDelete, cartUpdate, cartViewById, clearCart } from '../controllers/cartController.js';
import authenticateUser from '../middlewares/userMiddleware.js';





const cartRouter = express.Router();



cartRouter.post("/addcart/:userId",authenticateUser,cartAdding);
cartRouter.get("/viewbyidcart/:userId",authenticateUser,cartViewById);
cartRouter.put("/updatecart/:userId/:cartItemId",authenticateUser,cartUpdate);
cartRouter.delete("/cartdelete/:userId/:cartItemId",authenticateUser,cartDelete);
// cartRouter.delete("/cartdelete/:cartId/:cartItemId",authenticateUser,cartDelete);
cartRouter.delete('/clear',authenticateUser,clearCart)

export default cartRouter;
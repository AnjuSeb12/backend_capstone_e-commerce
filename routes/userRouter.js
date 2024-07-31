import express from "express"
import { getAllUsers, getSingleUser, userDelete, userLogin,userRegisteration, userUpdate } from "../controllers/userController.js";

const userRouter = express.Router()


userRouter.post("/signup",userRegisteration)
userRouter.post("/login",userLogin)
userRouter.get("/users",getAllUsers)
userRouter.get("/user/:id",getSingleUser)
userRouter.delete("/userdelete/:id",userDelete)
userRouter.put("/userupdate/:id",userUpdate)



export default userRouter;

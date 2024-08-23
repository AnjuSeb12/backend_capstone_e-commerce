import express from "express"
import { getAllUsers, getSingleUser, userDelete, userLogin,userRegisteration, userUpdate } from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";


const userRouter = express.Router()
// userRouter.get('/check-user', authenticateUser, (req, res) => {
//     if (req.user) {
//         res.json({ success: true, user: req.user });
//     } else {
//         res.status(401).json({ success: false, message: 'Not authenticated' });
//     }
// });


userRouter.post("/signup",userRegisteration)
userRouter.post("/login",userLogin)
userRouter.get("/users",getAllUsers)
userRouter.get("/user/:id",getSingleUser)
userRouter.delete("/userdelete/:id",userDelete)
userRouter.put("/userupdate/:id",authenticateUser,userUpdate)



export default userRouter;

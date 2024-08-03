import express from "express";
import {userReview, getReviewById } from "../controllers/reviewController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js"



const reviewRouter=express.Router();
reviewRouter.post("/reviewuser/:userId/:productId",authenticateUser,userReview)
reviewRouter.get("/viewreview/:productId/:userId",authenticateAdmin,getReviewById)



export default reviewRouter;

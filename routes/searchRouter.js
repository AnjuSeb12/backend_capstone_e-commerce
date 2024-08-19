import express from "express";
import search from "../controllers/searchController.js";





const searchRouter=express.Router()



searchRouter.get("/searchitem",search)

export default searchRouter;
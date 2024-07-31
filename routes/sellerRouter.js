import express from "express";
import { getAllSellers, getSingleSeller, sellerDelete,sellerLogin,sellerRegisteration,sellerUpdate } from "../controllers/sellerController.js";

const sellerRouter=express.Router();


sellerRouter.post("/sellersignup",sellerRegisteration);
sellerRouter.post("/sellerlogin",sellerLogin);
sellerRouter.get("/sellers",getAllSellers);
sellerRouter.get("/sellerbyid/:id",getSingleSeller);
sellerRouter.delete("/deleteseller/:id",sellerDelete);
sellerRouter.put("/updateseller/:id",sellerUpdate);

export default sellerRouter;
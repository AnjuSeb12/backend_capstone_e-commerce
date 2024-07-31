import express from 'express';
import userRouter from './routes/userRouter.js';
import sellerRouter from "./routes/sellerRouter.js"
import productRoute from './routes/productRoute.js';
import cors from "cors"
import orderRouter from './routes/orderRouter.js';


const app=express()
app.use(cors({
    credentials:true,
    origin:true,
}));




app.use(express.json());


app.use("/api/v1/user",userRouter);
app.use("/api/v1/seller",sellerRouter);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/order",orderRouter);









app.use((err,req,res,next)=> {
    console.log(err.message);
});

export default app;
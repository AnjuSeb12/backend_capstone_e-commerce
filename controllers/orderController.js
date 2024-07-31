import Order from "../models/orderModel.js";
import User from "../models/userModel.js";





const OrderAdding= async (req,res)=>{
    try {
        const {orderitems,totalprice,shippingaddress,totalquantity}=req.body;
        

        const order=await Order({
            orderitems,
            totalprice,
            shippingaddress,
            totalquantity
        })
        const newAddingOrder=await order.save();
        if(!order){
            return res.status(400).json({
                success:false,
                message:"No Order items"

            })
        }
        res.status(201).json({
            success:true,
            message:"Added order",
            order
        })


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
const orderViewById=async (req,res)=>{
    const {id}=req.params;
    try {
        const orderviewbyid=await Order.findById({id});
        if(!orderviewbyid){
            return res.status(404).json({
                successfalse,
                message:"not found"

            })
        }
        res.status(200).json({
            success:true,
            message:"Success",
            orderviewbyid
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
const allorderView=async(req,res)=>{
    try {
        const orderview=await Order.find();
        if(!orderview){
            return res.status(404).json({
                success:false,
                message:"not found orders"
            })
        }
        res.status(200).json({
            success:true,
            message:"Success",
            orderview
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error.message"
        })
        
    }
}
const orderDelete=async (req,res)=>{
    try {
        const {id}=req.params;
        const orderDelete=await Order.find(id);
        if(!orderDelete){
            return res.status(404).json({
                success:false,
                message:"not found orders"
            })
        }
        res.status(200).json({
            success:true,
            message:"Success Deleted",
           
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error.message"
        })
        
    }

}
export {orderDelete,allorderView,OrderAdding,orderViewById}
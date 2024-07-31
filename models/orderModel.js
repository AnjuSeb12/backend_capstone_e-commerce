import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    orderitems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            
        }
    ],
    totalquantity: {
        type: Number,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },

   
    
},
{ timestamp: true }

)
const Order = mongoose.model("order",orderSchema)
export default Order;
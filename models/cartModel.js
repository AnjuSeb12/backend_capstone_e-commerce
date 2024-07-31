import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
   userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    caertItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            quantity: {
                type: Number,
                default: 1
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
    }

   
    
},
{ timestamp: true }

)
const Cart = mongoose.model("cart",cartSchema)
export default Cart;
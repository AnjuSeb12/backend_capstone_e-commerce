import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
   
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    stock: {
        type: Number,
        required: true, 
        default: 0,
      },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers', required: true },
},
{ timestamps: true }

)
const Product = mongoose.model("products",productSchema)
export default Product;
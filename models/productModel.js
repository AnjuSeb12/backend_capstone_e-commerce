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
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers', required: true },
},
{ timestamp: true }

)
const Product = mongoose.model("products",productSchema)
export default Product;
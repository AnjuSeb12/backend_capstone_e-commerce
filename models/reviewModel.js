import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true

  },
  product: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"products",
    required:true
  },

  rating:{type: Number,required:true},
  text: {type:String,required:true}
   
   
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "users",
//         require: true
//     },
//     orderItems: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "products",
//                 require: true
//             },
//             quantity: {
//                 type: Number,
//                 required: true
//             },
//             totalPrice: {
//                 type: Number,
//                 required: true
//             },

//         }
//     ],

//     shippingAddress: {
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true },
      
//     },
   



// },
//     { timestamp: true }

// )
// const Order = mongoose.model("order", orderSchema)
// export default Order;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
    },
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);
export default Order;


import crypto from "crypto";
import Payment from "../models/paymentModel.js";
// import razorpayInstance from "../config/payment.js";
import Order from "../models/orderModel.js";



const orderAdding= async (req, res) => {
  const { userId, orderItems, shippingAddress } = req.body;

  try {
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
    });

    const newOrder = await order.save();

    if (!newOrder) {
      return res.status(400).json({
        success: false,
        message: "Failed to create order",
      });
    }

    const totalAmount = orderItems.reduce((total, item) => total + item.totalPrice, 0) * 100; // in paise

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_order_${newOrder._id}`,
    };

    razorpayInstance.orders.create(options, (error, paymentOrder) => {
      if (error) {
        return res.status(500).json({ message: "Payment initiation failed" });
      }

      res.status(201).json({
        success: true,
        order: newOrder,
        paymentOrderId: paymentOrder.id,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// 

const verifyPayment=async (req, res) => {
    try {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

 
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      await Order.findOneAndUpdate(
        { _id: razorpay_order_id.split("_")[2] },
        { paymentStatus: "Paid" }
      );

      res.json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// 
const allorderView = async (req, res) => {
    try {
      const orders = await Order.find().populate('user').populate('orderItems.product');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

//   

const orderViewById = async (req, res) => {
    const userId=req.user.id
    const { orderId } = req.params;
  
    try {
      const order = await Order.findOne({ _id: orderId, user: userId })
        .populate('user')
        .populate('orderItems.product');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

//   

const orderDelete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findByIdAndDelete(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  




export {orderAdding,verifyPayment,allorderView,orderViewById,orderDelete};













// const OrderAdding = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { orderItems, shippingAddress, paymentStatus } = req.body;


//         const order = await Order({
//             user: userId,
//             orderItems,

//             shippingAddress,
//             paymentStatus
//         })
//         const newAddingOrder = await order.save();
//         if (!newAddingOrder) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No Order items"

//             })
//         }
//         res.status(201).json({
//             success: true,
//             message: "Added order",
//             newAddingOrder
//         })



//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }}
   
// const orderViewById = async (req, res) => {
//     try{
//     const { userId,orderId } = req.params;
    
//     const order = await Order.findOne({ user: userId, _id: orderId }).populate('orderItems.product');
//         if (!order) {
//             return res.status(404).json({
//                 successfalse,
//                 message: "not found"

//             })
//         }
//         res.status(200).json({
//             success: true,
//             message: "Success",
//             order
//         })


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }
// }
// const allorderView = async (req, res) => {
//     try {
//         const orderview = await Order.find();
//         if (!orderview) {
//             return res.status(404).json({
//                 success: false,
//                 message: "not found orders"
//             })
//         }
//         res.status(200).json({
//             success: true,
//             message: "Success",
//             orderview
//         })


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "error.message"
//         })

//     }
// }
// const orderDelete = async (req, res) => {
//     try {
//         console.log("hitted")
//         const { id } = req.params;
//         console.log(req.params.id)
//         const orderDelete = await Order.findByIdAndDelete(id);
//         if (!orderDelete) {
//             return res.status(404).json({
//                 success: false,
//                 message: "not found orders"
//             })
//         }
//         res.status(200).json({
//             success: true,
//             message: "Success Deleted",

//         })


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "error.message"
//         })

//     }

// }





// export { orderDelete, allorderView, OrderAdding, orderViewById}
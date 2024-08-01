import Order from "../models/orderModel.js";
import User from "../models/userModel.js";





const OrderAdding = async (req, res) => {
    try {
        const { userId } = req.params;
        const { orderItems, shippingAddress, paymentStatus } = req.body;


        const order = await Order({
            user: userId,
            orderItems,

            shippingAddress,
            paymentStatus
        })
        const newAddingOrder = await order.save();
        if (!newAddingOrder) {
            return res.status(400).json({
                success: false,
                message: "No Order items"

            })
        }
        res.status(201).json({
            success: true,
            message: "Added order",
            newAddingOrder
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }}
//     const updateOrderPayment = async (req, res) => {
//         const { userId, orderId } = req.params;
//         const { paymentStatus } = req.body;
      
//         try {
//           const order = await Order.findOne({ user: userId, _id: orderId });
      
//           if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//           }
      
//           order.paymentStatus = paymentStatus;
      
//           await order.save();
//           res.status(200).json(order);
//         } catch (error) {
//           res.status(400).json({ message: error.message });
//         }
//       };
      
// }
const orderViewById = async (req, res) => {
    try{
    const { userId,orderId } = req.params;
    
    const order = await Order.findOne({ user: userId, _id: orderId }).populate('orderItems.product');
        if (!order) {
            return res.status(404).json({
                successfalse,
                message: "not found"

            })
        }
        res.status(200).json({
            success: true,
            message: "Success",
            order
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}
const allorderView = async (req, res) => {
    try {
        const orderview = await Order.find();
        if (!orderview) {
            return res.status(404).json({
                success: false,
                message: "not found orders"
            })
        }
        res.status(200).json({
            success: true,
            message: "Success",
            orderview
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error.message"
        })

    }
}
const orderDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const orderDelete = await Order.find(id);
        if (!orderDelete) {
            return res.status(404).json({
                success: false,
                message: "not found orders"
            })
        }
        res.status(200).json({
            success: true,
            message: "Success Deleted",

        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error.message"
        })

    }

}
export { orderDelete, allorderView, OrderAdding, orderViewById}
import Stripe from "stripe";
import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js"
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const orderAdding = async (req, res) => {
    try {
        console.log("hittedhhh")
        console.log("Received request to add order");

        const userId = req.user.id;
        console.log(req.body.orderItems)
        const { orderItems, shippingAddress } = req.body;

        if (!orderItems || !shippingAddress) {
            return res.status(400).json({
                success: false,
                message: 'Order items and shipping address are required.',
            });
        }

        for (const item of orderItems) {
            if (!item.productId || !item.title || !item.quantity || !item.price || !item.totalPrice) {
                return res.status(400).json({
                    success: false,
                    message: 'Order item fields are missing.',
                });
            }
        }

        const totalAmount = orderItems.reduce((total, item) => total + item.totalPrice, 0) * 100;

        const order = new Order({
            user: userId,
            orderItems,
            shippingAddress,
        });

        const newOrder = await order.save();
     

        if (!newOrder) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create order.',
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            metadata: { orderId: newOrder._id.toString() },
        });
        await Cart.deleteMany({ user: userId });

        res.status(201).json({
            success: true,
            order: newOrder,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
export const verifyPayment = async (req, res) => {
    console.log("verification hitted");
    console.log(req.body);

    const userId = req.user.id;
    const { paymentIntentId } = req.body;

    try {
       
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === "succeeded") {
           
            const orderId = paymentIntent.metadata.orderId;
            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            // update stock
            for (const item of order.orderItems) {
                await Product.findByIdAndUpdate(
                    item.productId,
                    { $inc: { stock: -item.quantity } }
                );
            }

     
            const payment = new Payment({
                stripePaymentIntentId: paymentIntentId,
                paymentStatus: "Paid",
                order: orderId,
                user: userId,
            });

            await payment.save();

            await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });

            res.json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Payment not successful" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// cancel Payment
export const cancelPayment = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Restore stock for each item in the order
        for (const item of order.orderItems) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: item.quantity } }
            );
        }

        await Order.findByIdAndUpdate(orderId, { paymentStatus: "Canceled" });

        res.json({ message: "Order canceled and stock restored" });
    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};





export const allOrderView = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('orderItems.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const orderViewById = async (req, res) => {
    const userId = req.user.id;
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

export const orderDelete = async (req, res) => {
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

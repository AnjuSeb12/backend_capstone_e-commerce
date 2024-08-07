import Review from "../models/reviewModel.js";
import Order from "../models/orderModel.js";



const userReview = async (req, res) => {
    try {
        console.log(req.params)
        const { userId, productId } = req.params;
        const { rating, text } = req.body;

        const purchase = await Order.find({ user: userId, product: productId });
        console.log(purchase)

        if (!purchase) { return res.status(403).send('User has not purchased product') };

        const review = new Review({
            user: userId,
            product: productId,
            rating,
            text
        });
        await review.save();
        res.status(201).json({
            success: true,
            message: "Review Submitted",
            review
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        })

    }

};
const getReviewById = async (req, res) => {
    try {
        const {productId,userId } = req.params;

        const getreview = await Review.find({ product:productId,user:userId});
        if (!getreview) {
            return res.status(404).json({
                success: false,
                message: "Not have User review",

            })
        }
        res.status(200).json({
            success:true,
            message: "Successfully got review from User side",
            getreview
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        })

    }

}
const getReviewByIdinuserpage = async (req, res) => {
    try {
        const {productId } = req.params;

        const getreview = await Review.find({ product:productId});
        if (!getreview) {
            return res.status(404).json({
                success: false,
                message: "Not have User review",

            })
        }
        res.status(200).json({
            success:true,
            message: "Successfully got review from User side",
            getreview
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        })

    }

}

export { getReviewById, userReview,getReviewByIdinuserpage };


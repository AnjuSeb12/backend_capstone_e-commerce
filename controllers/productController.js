import Product from "../models/productModel.js";

import { cloudinaryInstance } from "../config/cloudinary.js"




const addProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        const {sellerId}= req.params;
        console.log("hitted")
        console.log(req.params.sellerId)
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" })
        }

        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err, "error");
                return res.status(500).json({
                    success: false,
                    message: "Error",
                });
            }

            const imageUrl = result.url;
            console.log(imageUrl)

            const product = new Product({
                title,
                description,
                price,
                category,
                image: imageUrl,
                seller: sellerId
            });

            console.log(product)
            const productCreated = await product.save();
            if (!productCreated) {
                return res.send("product is not created");
            }
            return res.status(201).json({
                success:true,
                message:"Added product",
                productCreated
            });
        });
    } catch (error) {
        console.log("something went wrong", error);
        res.send("failed to Add product");
    }
};

const getAllProducts = async (req, res) => {
    try {


        const products = await Product.find().populate('seller','name email');
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "All Products",
            products
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error"
        })


    }

}
const getSingleProductBYId = async (req, res) => {
    try {

        const { sellerId } = req.params;
        const product = await Product.find({ seller: sellerId });
        console.log(product)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "not found product"
            })
        }
        res.status(200).json({
            success: true,
            message: "Successfully got product by id",
            product

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error"
        })

    }

}
const updateProduct = async (req, res) => {
    try {
        const { sellerId,id} = req.params;
        console.log(req.body)
        const { title, description, price } = req.body;
        const productUpdate = await Product.findOne({ _id: id, seller: sellerId });
        productUpdate.title = title;
        productUpdate.description = description;
        productUpdate.price = price;
        if (req.file) {
            const result = await cloudinaryInstance.uploader.upload(req.file.path);
            productUpdate.image = result.url;
        }
        await productUpdate.save();
        console.log(productUpdate)




        if (!productUpdate) {
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "updated",
            productUpdate
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error"
        })

    }

}
const deleteProduct = async (req, res) => {
    try {
        const { id,sellerId } = req.params;
        const deleteProduct = await Product.findOneAndDelete({_id:id,seller:sellerId});
        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Deleted",
            deleteProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error"
        })

    }



}
export { addProduct, getAllProducts, getSingleProductBYId, updateProduct, deleteProduct }
import Product from "../models/productModel.js";

import {cloudinaryInstance} from "../config/cloudinary.js"




const addProduct = async (req, res) => {
    try {
    
     
      if(!req.file) {
      return res.status(400).json({success:false,message:"No file uploaded"})
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
        const body = req.body;
        console.log(body, "body");
  
        const { title, description, price,category } = body;
  
       
  
        const product = new Product({
          title,
          description,
          price,
          category,
          image:imageUrl,
        });
        
        console.log(product)
        const productCreated = await product.save();
        if (!productCreated) {
          return res.send("product is not created");
        }
        return res.send(productCreated);
      });
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to Add product");
    }
  };

const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();
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

        const { id } = req.params;
        const product = await Product.findById({ id });
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
        const { id } = req.params;
        const { title, description, price } = req.body;
        const productUpdate = await Product.findById(id);
        productUpdate.title = title,
            productUpdate.description = description,
            productUpdate.price = price,
            productUpdate.save();




        if (!productfind) {
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
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);
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
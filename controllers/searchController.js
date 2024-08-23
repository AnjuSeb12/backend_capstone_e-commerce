import Product from "../models/productModel.js"



const searchItems = async (req, res) => {
    try {
        const query = req.query.query || ''; // Query from the URL
        const regex = new RegExp(query, 'i'); // Case-insensitive regex

        // Search for products by title, category, or subcategory
        const products = await Product.find({
            $or: [
                { title: regex },
                { category: regex },
                { subcategory: regex }
            ]
        });

        res.status(200).json({
            success: true,
            searchItem: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default searchItems;

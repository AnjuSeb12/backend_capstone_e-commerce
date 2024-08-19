import Product from "../models/productModel.js";

const search = async (req, res) => {
  try {
    console.log("today hitted")
    const { title,category } = req.query;

    let searchQuery = {};
    
    if (title) {
      searchQuery.title = new RegExp(title, 'i');
    }
    else if(category) {
      searchQuery.category = new RegExp(category,'i')
    }
    else {
      return res.status(400).json({ message: "Please provide a search query." });
    }

    const searchItem = await Product.find(searchQuery);
    res.json({ searchItem });
    console.log("searchitem hitted")
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

export default search;

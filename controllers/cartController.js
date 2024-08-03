import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";





const cartAdding = async (req, res) => {
  try {
    console.log("hitted")
    const { userId } = req.params;
    const { productId, quantity } = req.body;



    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }


    let cart = await Cart.findOne({ user: userId });


    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }


    const cartItem = cart.cartItems.find(item => item.product.toString() === productId);

    if (cartItem) {

      cartItem.quantity += Number(quantity);
      cartItem.totalPrice = cartItem.quantity * product.price;
    } else {

      cart.cartItems.push({ product: productId, quantity, totalPrice: product.price * quantity });
    }


    await cart.save();
    console.log(cart)

    res.status(201).json(cart);
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
}



const cartViewById = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)



    const cartviewbyid = await Cart.find({ user: userId }).populate('cartItems.product');

    if (!cartviewbyid) {
      return res.status(404).json({
        success: false,
        message: "not found"

      })
    }
    res.status(200).json({
      success: true,
      message: "Success",
      cartviewbyid
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}
const cartUpdate = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;
    const { quantity } = req.body;


    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.cartItems.id(cartItemId);

    if (cartItem) {
      cartItem.quantity = quantity;
      const product = await Product.findById(cartItem.product);
      cartItem.totalPrice = cartItem.quantity * product.price;

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

  

const cartDelete = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === cartItemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cart.cartItems.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      success:true,
      message:"Deleted you requested cartitem",
      cart
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { cartDelete, cartAdding, cartViewById, cartUpdate }
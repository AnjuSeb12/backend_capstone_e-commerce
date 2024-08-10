import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";





const cartAdding = async (req, res) => {
  try {
    console.log("hitted")
    const userId = req.params;
    const { productId, quantity } = req.body;



    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Check if there's enough stock 

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }


    let cart = await Cart.findOne({ user: userId });


    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }


    const cartItem = cart.cartItems.find(item => item.product.toString() === productId);

    if (cartItem) {
      if (product.stock < cartItem.quantity + quantity) {
        return res.status(400).json({ message: 'Insufficient stock available' });
      }

      cartItem.quantity += Number(quantity);
      cartItem.totalPrice = cartItem.quantity * product.price;
    } else {

      cart.cartItems.push({ product: productId, quantity, totalPrice: product.price * quantity });
    }

    // Decrease the product's stock
    product.stock -= quantity;
    await product.save();

    await cart.save();
    console.log(cart)

    res.status(201).json(cart);
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};



const cartViewById = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)



    const cartviewbyid = await Cart.findOne({ user: userId }).populate('cartItems.product');

    if (!cartviewbyid) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"

      });
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
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const product = await Product.findById(cartItem.product);

    // Check if there's enough stock for the update
    const stockChange = quantity - cartItem.quantity;
    if (product.stock < stockChange) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    // Update the cart item quantity and total price

    cartItem.quantity = quantity;
    
    cartItem.totalPrice = cartItem.quantity * product.price;


    // Adjust the product's stock accordingly
    product.stock -= stockChange;
    await product.save();
    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}



// const cartDelete = async (req, res) => {
//   try {
//     const { userId, cartItemId } = req.params;

//     const cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === cartItemId);
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     cart.cartItems.splice(itemIndex, 1);
//     await cart.save();

//     res.status(200).json({
//       success: true,
//       message: "Deleted you requested cartitem",
//       cart
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
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

    const cartItem = cart.cartItems[itemIndex];

    // Restore the stock when the item is removed from the cart
    const product = await Product.findById(cartItem.product);
    product.stock += cartItem.quantity;
    await product.save();

    // Remove the item from the cart
    cart.cartItems.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Deleted requested cart item",
      cart
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Controller to clear the entire cart for a user
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available in req.user after authentication

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Clear the cart items
        cart.cartItems = [];

        // Save the empty cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart has been cleared successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export { clearCart,cartDelete, cartAdding, cartViewById, cartUpdate }
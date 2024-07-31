import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getSingleProductBYId, updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/uploadMiddleware.js';

const productRoute = express.Router();



productRoute.post('/addproduct',upload.single('image'),addProduct);
productRoute.get('/getproducts',getAllProducts);
productRoute.get('/getsingleproduct/:id',getSingleProductBYId);
productRoute.put('/update/:id',updateProduct);
productRoute.delete('/deleteproduct/:id',deleteProduct);



export default productRoute;
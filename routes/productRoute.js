import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getSingleProductBYId, updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateSeller from '../middlewares/sellerMiddleware.js';
import authenticateAdmin from '../middlewares/adminMiddleware.js';

const productRoute = express.Router();



productRoute.post('/addproduct/:sellerId',authenticateSeller,upload.single('image'),addProduct);
productRoute.get('/getproducts',authenticateAdmin,getAllProducts);
productRoute.get('/getsingleproduct/:sellerId',authenticateSeller,getSingleProductBYId);
productRoute.put('/update/:sellerId/product/:id',authenticateSeller,upload.single('image'),updateProduct);
productRoute.delete('/deleteproduct/:sellerId/product/:id',authenticateSeller,deleteProduct);



export default productRoute;
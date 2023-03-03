import express from "express"
import { auth } from "../middleware/auth.mjs"
import { CartController } from "../controller/Cart.controller.mjs";

const cartRouter = express.Router();
const cartController = new CartController;
//get cart
cartRouter.get('/cart', auth, cartController.getCart.bind(cartController));

//create cart
cartRouter.post('/cart', auth, cartController.createCart.bind(cartController)); 

cartRouter.delete("/cart/", auth, cartController.deleteItemInCart.bind(cartController));

export { cartRouter };
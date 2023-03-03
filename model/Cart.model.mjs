import { Cart } from "../models/Cart.mjs";
import { Item } from "../models/Item.mjs";

export class CartModel {
    async getCart(code) {
        return await Cart.findOne(code);
    }

    async createCart(code) {
        return await Cart.findOne(code);
    }

    async createCartAddItem(code) {
        return await Item.findOne(code);
    }

    async deleteItemInCart(code) {
        return await Cart.findOne(code);
    }

    
}
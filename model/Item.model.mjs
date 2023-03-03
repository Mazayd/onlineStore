import { Item } from "../models/Item.mjs";

export class ItemModel {
    async fetchAnItem (code) {
        return await Item.findOne(code);
    }

    async fetchAllItem () {
        return await Item.find({});
    }

    async updateItem (code) {
        return await Item.findOne(code);
    }

    async deleteItem (code) {
        return await Item.findOneAndDelete(code);
    }
}
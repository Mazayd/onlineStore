import { Item } from "../models/Item.mjs";
import { ItemModel } from "../model/Item.model.mjs";

export class ItemController {
    constructor() {
        this.itemModel = new ItemModel;
    }

    async createItem(req, res) {
        try {
            const newItem = new Item({
                ...req.body,
                owner: req.user._id
            })
            await newItem.save();
            res.status(201).send(newItem);
        } catch (error) {
            res.status(400).send({ massage: 'error' });
        }
    }

    async fetchAnItem(req, res) {
        try {
            const code = { _id: req.params.id };
            const item = await this.itemModel.fetchAnItem(code);
            if (!item) {
                res.status(404).send({ error: 'Item not found' });
            }
            res.status(200).send(item);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }

    async fetchAllItem(req, res) {
        try {
            const items = await this.itemModel.fetchAllItem();
            res.status(200).send(items);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async updateItem(req, res) {

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'description', 'category', 'price'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'invalid updates' });
        }

        try {
            const code = {_id: req.params.id};
            const item = await this.itemModel.updateItem(code);

            if (!item) {
                return res.status(404).send();
            }

            updates.forEach((update) => item[update] = req.body[update]);
            await item.save();
            res.send(item);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteItem (req, res) {
        try {
            const code = {_id: req.params.id};
            const deleteItem = await this.itemModel.deleteItem(code); 
            if (!deleteItem) {
                res.status(404).send({error: 'Item not found'});
            }
            res.send(deleteItem);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}
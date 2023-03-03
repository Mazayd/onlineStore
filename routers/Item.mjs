import express from "express";
import { auth } from "../middleware/auth.mjs";
import { ItemController } from "../controller/Item.controller.mjs";

const itemRouter = express.Router();
const itemConroller = new ItemController;
//create a new item
itemRouter.post('/items', auth, itemConroller.createItem.bind(itemConroller));

//fetch an item
itemRouter.get('/items/:id', itemConroller.fetchAnItem.bind(itemConroller));

//fetch all item
itemRouter.get('/items', itemConroller.fetchAllItem.bind(itemConroller));
   
//update an item
itemRouter.patch('/items/:id', auth, itemConroller.updateItem.bind(itemConroller));
 
//delete an item 
itemRouter.delete('/item/:id', auth, itemConroller.deleteItem.bind(itemConroller)); 

export { itemRouter };
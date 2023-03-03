import express  from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/User.mjs";
import { itemRouter } from "./routers/Item.mjs";
import { cartRouter } from "./routers/Cart.mjs";
import morgan from "morgan";



mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true,}).then(() => console.log('mongoose ready'))


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('common'));
app.use('/item', itemRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.listen(port, () => {
    console.log('Server listen port ' + port);
})

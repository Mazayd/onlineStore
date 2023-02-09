import express  from "express";
import mongoose from "mongoose";

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {
useNewUrlParser: true,
}).then(() => console.log('mongoose ready'))


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.listen(port, () => {
    console.log('Server listen port' + port)
})

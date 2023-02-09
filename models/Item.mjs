import mongoose from "mongoose";

const ObjectID = mongoose.Schema.Types.ObjectId;

const itemShema = new mongoose.Schema({
    owner:{
        type: ObjectID,
        require: true,
        ref: 'User'
    },
    name:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
}, {
    timeseries:  true
})

export const Item = mongoose.model('Item', itemShema);
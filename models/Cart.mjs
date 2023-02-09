import mongoose from "mongoose";

const ObjectID = mongoose.Schema.Types.ObjectId;

const cartShema = mongoose.Schema({
    owner:{
        type: String,
        require: true,
        ref: 'User'
    },
    items:[{
        itemID:{
            type: ObjectID,
            require: true,
            ref: 'Item'
        },
        name: String,
        quantity: {
            type: Number,
            require: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill:{
        type: Number,
        require: true,
        default: 0
    }
},{
    timestamps: true
})

export const Cart = mongoose.model('Cart', cartShema);
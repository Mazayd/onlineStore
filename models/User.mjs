import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const UserShema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 4,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error ('password musn\'t contain password')
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            require: true,
        },
    }],
},
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', UserShema);
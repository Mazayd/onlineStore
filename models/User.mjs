import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
//generate auth token
UserShema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
     await user.save()
    return token
}

//login in user
UserShema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error ('Unable to log in');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        throw new Error ('Unable to login');
    }
    return user;
}


//Hash plain password before saving
UserShema.pre('save', async function (next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})



export const User = mongoose.model('User', UserShema);
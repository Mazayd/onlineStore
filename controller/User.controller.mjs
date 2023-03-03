import { UserModel } from "../model/User.model.mjs";
import { User } from "../models/User.mjs";

export class UserController {
    constructor () {
        this.userModel = new UserModel();
    }

    async singupUser (req, res){
        try {
            const user = new User(req.body)

            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }

    async loginUser (req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async logoutUser (req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
            res.send('Done')
        } catch (error) {
            res.status(500).send()
        }
    }

    async logoutAllUser (req, res) {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.send('Done');
    
        } catch (error) {
            res.status(500).send();
        }
    }
}
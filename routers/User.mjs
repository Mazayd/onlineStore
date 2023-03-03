import express from "express";
import { UserController } from "../controller/User.controller.mjs";
import { auth } from "../middleware/auth.mjs";

const userRouter = new express.Router();

const userController = new UserController

//singup
userRouter.post('/users', userController.singupUser.bind(userController));

//login
userRouter.post('/users/login', userController.loginUser.bind(userController));
   
//logout
userRouter.post('/users/logout', auth, userController.logoutUser.bind(userController));

//logout all
userRouter.post('/users/logoutAll', auth, userController.logoutAllUser.bind(userController));

export { userRouter };

import { Response, Request } from "express"
import { IUser } from "./../../types/user"
import User from "../../models/user"
import { use } from "chai";

var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {params: { id }} = req
    const user: IUser | null = await User.findById({ _id: id })
    res.status(200).json({ user })
  } catch (error) {
    throw error
  }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updateUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    )
    const allUsers: IUser[] = await User.find()
    res.status(200).json({
      message: "User updated",
      user: updateUser
    })
  } catch (error) {
    throw error
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    )
    const allUsers: IUser[] = await User.find()
    res.status(200).json({
      message: "User deleted",
      user: deletedUser
    })
  } catch (error) {
    throw error
  }
}

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    // receive data from the post request
    const body = req.body as Pick<IUser, "email" | "password" | "name" >

    // create user obj
    const user: IUser = new User({
      name: body.name,
      email: body.email,
      password: body.password
    })

    // check if "email" is taken
    const checkUser: IUser | null = await User.findOne({ email: user.email });
    // return error if "email" is taken
    if (!checkUser) {
      // generate encryption salt with 10 rounds
      const salt = await bcrypt.genSalt(10);
      // encrypt password
      const hash = await bcrypt.hash(user.password, salt);
      // change plain text to hash
      user.password = hash;
      // save user in the database, async
      const newUser: IUser = await user.save()
      // sign in and get token
      var token = jwt.sign({id: newUser.id}, newUser.password);
      // debugging stuff
      console.log("[SIGN-UP] \n\tuser: " + newUser.name + ", \n\temail: " + newUser.email + ", \n\tpassword: " + newUser.password);
      // return token
      res.status(201).json({ token: token})
    } else {
      // return error
      res.status(202).json({msg: "[SIGN-UP] Email exists"});
    }
  } catch (error) {
    throw error
  }
}
  
const logIn = async (req: Request, res: Response): Promise<void> => {
  try {
    // receive data from the post request
    const body = req.body as Pick<IUser, "email" | "password">

    // create user obj
    const loadedUser: IUser = new User({
      email: body.email,
      password: body.password
    })

    // check if "email" exists
    const checkUser: IUser | null = await User.findOne({ email: loadedUser.email });
    if (checkUser) {
      // we have user, lets compare password input with hashed password
      const compare = await bcrypt.compare(loadedUser.password, checkUser.password);
      // if compare true, then login
      if (compare) { 
        // login and get token
        var token = jwt.sign({ id: loadedUser.id }, loadedUser.password);
        // return http 200 + token
        res.status(200).json({ token: token });
      } else {
        res.status(201).json({msg: "[LOGIN] Wrong password"}); 
      }
    } else {
      // return error
      res.status(202).json({msg: "[LOGIN] Email doesnt exist"});
    }
  } catch (error) {
    throw error
  }
}

export { getUser, deleteUser, updateUser, signUp, logIn}

  
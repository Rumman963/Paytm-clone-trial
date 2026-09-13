import  express , { Router } from "express";
import { JWT_PASSWORD } from "../config.js";
import jwt from "jsonwebtoken";
import {z} from "zod";
import { UserModel } from "../db.js";
import bcrypt from "bcrypt";


export const Userrouter = express.Router();

const signupSchema = z.object({

    email:z.email(),
    firstName:z.string().min(1),
    lastName:z.string().min(1),
    password:z.string().min(6)

})

Userrouter.post("/signup" , async (req,res) => {
    const body=req.body;
    const parseSchema= signupSchema.safeParse(req.body);
    if(!parseSchema.success){
        return res.json({
            message:"Incorrect Inputs"
        })
    }

    const { firstName, lastName, email, password } = parseSchema.data;

    const existingUser = await UserModel.findOne({email});

    if(existingUser){

     return res.status(409).json({

     message:"User already exists"
   })
}

      
    const hashedPassword = await bcrypt.hash(password, 10);

    const dbUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password:hashedPassword
     });

     const token = jwt.sign({
        userId:dbUser._id
     }, JWT_PASSWORD)

     res.json({
        message:"user created successfully",
        token:token
     })

})

Userrouter.post("/signin" , (req,res)=>{
    
})
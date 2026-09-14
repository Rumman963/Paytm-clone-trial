import  express , { Router } from "express";
import { JWT_PASSWORD } from "../config.js";
import jwt from "jsonwebtoken";
import {z} from "zod";
import { UserModel } from "../db.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";


export const Userrouter = express.Router();

const signupSchema = z.object({

    email:z.email(),
    firstName:z.string().min(1),
    lastName:z.string().min(1),
    password:z.string().min(6)

})

const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});


const updateSchema = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()

})

Userrouter.post("/signup" , async (req,res) => {
    const parseSchema= signupSchema.safeParse(req.body);
    if(!parseSchema.success){
        
        return res.status(400).json({ 
            message: "Incorrect Inputs" 
        });
    }

    const { firstName, lastName, email, password } = parseSchema.data;

 try{

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
}catch(error){
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });

}   

})

Userrouter.post("/signin"  ,async (req,res)=>{
    const parseSchema = signinSchema.safeParse(req.body);
    if(!parseSchema.success){
        return res.status(400).json({
            message:"Incorrect inputs"
        })
    }
    
    const {email , password}= parseSchema.data

    try {

        const exisitingUser = await UserModel.findOne({email});

        if(!exisitingUser){
            return res.status(401).json({ message: "Invalid credentials" });

        }

        const isPasswordCorrect = await bcrypt.compare(password, exisitingUser.password);

        if(!isPasswordCorrect){
             return res.status(401).json({ message: "Invalid credentials" });

        }


        const token = jwt.sign({
            userId: exisitingUser._id


        } , JWT_PASSWORD)


        res.status(200).json({
            message: "Signed in successfully",
            token: token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });

    }
    
})


Userrouter.put("/updateInfo", authMiddleware , async (req,res)=>{

    const parseSchema = updateSchema.safeParse(req.body);
    if(!parseSchema.success){
        return res.status(411).json({
            message:"error while updating information"
        })
    }


    const updates = parseSchema.data

    if(updates.password){
        updates.password = await bcrypt.hash(updates.password , 10)
    }


    try{

            const updateExistingUser = await UserModel.updateOne(
                { _id: req.userId }, 
                updates
            )
            res.json({
             message:"update successfully"
          })
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

         
})


Userrouter.get("/userssearch" , (req ,res)=>{

})
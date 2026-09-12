import express from "express";
import cors from "cors"
import { UserModel } from "./db.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors({
    origin:[
        "http://localhost:3000"

    ]}));

app.post("/app/v1/signup" , async (req , res)=>{
    const username = req.body.username
    const password = req.body.password

    try{
        await UserModel.create({
            username:username,
            password:password
        })

        res.json({
            message:"You have Signup"
        })
    }catch(error){
        console.error(error); 
    res.status(500).json({ message: "Something went wrong" });
    }

})

app.post("/app/v1/signin" , (req , res)=>{


})


app.get("/app/v1/payment/history" , (req , res)=>{


})



app.listen(3000);
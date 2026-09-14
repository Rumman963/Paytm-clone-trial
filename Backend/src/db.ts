import mongoose from "mongoose";
import { Schema , model } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO_URL as string);


const userSchema = new Schema({
    firstName:{type:String , required: true , trim:true},
    lastName:{type:String , required: true, trim:true},
    email:{type:String , unique:true , required:true, trim:true , lowercase: true},
    password:{type:String ,  required: true }

})


export const UserModel = model("users" , userSchema);


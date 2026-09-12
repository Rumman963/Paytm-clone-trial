import mongoose from "mongoose";
import { Schema , model } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO_URL as string);


const userSchema = new Schema({
    username:{type:String, unique:true , required: true},
    password:{type:String ,  required: true}

})


export const UserModel = model("users" , userSchema);


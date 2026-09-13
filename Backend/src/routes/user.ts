import  express , { Router } from "express";

export const Userrouter = express.Router();

import {z} from "zod";

const ZodSchema = z.object({
    email:z.email({

    })

})


Userrouter.post("/signup" , (req,res)=>{

})

Userrouter.post("/signin" , (req,res)=>{
    
})
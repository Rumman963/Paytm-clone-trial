import express , {Router} from "express";
import { accountModel } from "../db.js";
import { authMiddleware } from "../middleware.js";
export const Accountrouter = express.Router();
import mongoose from "mongoose";
import {z} from "zod";


const transferSchema = z.object({
    to: z.string(),
    amount: z.number().positive()
});


Accountrouter.post("/transfer", authMiddleware, async (req,res)=>{
    const parsed = transferSchema.safeParse(req.body);
    if (!parsed.success) {
    return res.status(400).json({ message: "Incorrect Inputs" });
 }
    const {amount,to} = parsed.data
    
    const session = await mongoose.startSession();

    session.startTransaction();

    //Fetch account  within the transactions
    
    try{
    const account = await accountModel.findOne({
        userId: (req.userId as string)
    }).session(session);

    
   

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient funds"
        })
     

    }

    const toAccount = await accountModel.findOne({
        userId:to }).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"invalid account"
            })
        }

       //perform the transfer
       await accountModel.updateOne({userId:req.userId as string} , {$inc: {balance: -amount }}).session(session);
       await accountModel.updateOne({userId:to} , {$inc: {balance: amount }}).session(session);


       //commit the transactions
       await session.commitTransaction();

       res.json({
        message:"transfer successful"
       })

    }catch(e){
        
    } 

})

















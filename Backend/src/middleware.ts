import type {NextFunction, Request , Response} from 'express';
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from './config.js';



export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        return res.status(401).json({
            message:"No token provided"
        })
    }

    const token = authHeaders.split(' ')[1]

    if(!token){
        return res.status(401).json({
       message:"No token provided"

    })}

   
try {
    const decoded = jwt.verify(token , JWT_PASSWORD) as {userId:string};
   
    if(decoded.userId){
    req.userId = decoded.userId;
    } else{
        return res.status(403).json({
            message: "Invalid token payload"
        })

    }

    next();
}catch(error){
    return res.status(403).json({
        message: "Invalid or expired token"
    });
}

}

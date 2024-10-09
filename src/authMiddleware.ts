import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export const authMiddleware =  (req: Request, res:Response, next:NextFunction) => {
    const token = req.headers['authorization'] || "";
    
    verify(token, process.env.JWT_SECRET || "", (err,result)=>{
        if(err){
            res.status(401).json({
                message: 'Unauthorized'
            });
            return;
        }
        //if in future any this has to be addded to the req body form the decode token
        // will be don here eg req.body.id = result.id
        //@ts-ignore
        req.body.username = result?.username;
    })
    next();
};
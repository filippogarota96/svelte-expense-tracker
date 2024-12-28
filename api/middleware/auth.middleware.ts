import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Database from "../Database";
import { ObjectId, WithId } from "mongodb";

import { verifyToken } from "../lib/auth";

import ApiResponse from "../ApiResponse";

const db = new Database();

interface AuthUser {
    email: string;
    name: string;
    _id: ObjectId;
}


export interface AuthenticatedRequest extends Request {
    user?: AuthUser;
}


export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            let payload : {email: string, id: string} = await verifyToken(req.headers.authorization) as { email: string; id: string; };
        
            let id = new ObjectId(payload.id);
            
            const user  = await db.findOne("users", { _id: id });
            
            if (user) {
                // Passo l'utente alla richiesta così è disponibile nei controller 
                req.user = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                }
                next();
            } else {
                res.status(401).json(
                    new ApiResponse([], 401, "Token not present or wrong")
                );
            }
            

        } else {
            res.status(401).json(
                new ApiResponse([], 401, "Token not present or wrong")
            );
        }
    } catch (error) {}
};

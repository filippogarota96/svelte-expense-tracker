import crypto from 'crypto';
import jwt, { sign } from 'jsonwebtoken';
import {configDotenv} from 'dotenv';
import ApiResponse from '../ApiResponse';

interface UserId {
    id: string;
    email: string;
}
                
configDotenv();

export const generateToken = (payload: UserId) => {

    process.env.JWT_TOKEN = process.env.JWT_TOKEN || crypto.randomBytes(64).toString('hex');

    return new Promise((resolve, reject) => {
        sign(payload, process.env.JWT_TOKEN as string, {expiresIn: '2h'}, (err, token) => {
            if (err) {
                reject(new ApiResponse([], 500, "Error generating token"));
            } else {
                resolve(token);
            }
        });
    });
}


export const verifyToken = (token: string) => {
    try {
    
        return new Promise((resolve, reject) => {
            const cleanToken = token.replace('Bearer ', '');
            jwt.verify(cleanToken, process.env.JWT_TOKEN as string, (err, decoded) => {
                if (err) {
                    reject(new ApiResponse([], 401, "Token not present or wrong"));
                } else {
                    resolve(decoded);
                }
            });
        });

    } catch (error) {
        console.error(error);
    }
}
import { Request, Response } from "express";
import { Router } from "express";
import Database from "../Database";
import bcrypt from "bcrypt";
import ApiResponse from "../ApiResponse";
import { generateToken } from "../lib/auth";

import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const users = Router();
const db = new Database();

users.post("/register", async (req, res): Promise<any> => {
    try {

        const { name, email, password, confirmPassword } = req.body;
        

        if (password !== confirmPassword) {
            return res.status(400).json(new ApiResponse([], 400, "Passwords do not match"));
        }

        let emailFound = await db.findOne("users", { email });

        if (emailFound) {
            return res.status(400).json(new ApiResponse([], 400, "Email already in use"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword,
        };

        const response = await db.insertOne("users", newUser);

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse([], 500, "Errore"));
    }
});


users.post("/login", async (req, res) : Promise<void> => {
    try {

        const { email, password } = req.body;

        const user = await db.findOne("users", { email });

        
        if (user) { 

            let userPassword = await bcrypt.compare(password, user.password);

            if (userPassword) { 

                const token = await generateToken({email: user.email, id: user._id.toString()});
                
                res.status(200).json(new ApiResponse({
                    token: token,
                    name: user.name,
                    email: user.email
                }, 200, "User logged in"));


            } else {
                res.status(401).json(new ApiResponse([], 401, "Invalid credentials"));
            }

        } else {
            res.status(401).json(new ApiResponse([], 404, "User not found"));
        }

    
    } catch (error) {



    }

});

// users.get("/", async (_, res) => {
//     const users = await db.find("users");
//     res.send(users);
// });

// let secret = crypto.randomBytes(64).toString('hex')


export default users;
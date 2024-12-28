import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenses from "./controllers/expensesController";
import users from "./controllers/usersController";
import Database from "./Database";
import lists from 'express-list-endpoints';


dotenv.config();

const app: Application = express();
app.use(cors());

const port = process.env.PORT || 3030;
const db = new Database();

app.use(express.json());

app.use('/api/expenses', expenses);
app.use('/api/users', users);

const endpoints = lists(app);

console.log(endpoints);




app.listen(port, async () => {
    try {
        await db.connect();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error(error);
    }
});


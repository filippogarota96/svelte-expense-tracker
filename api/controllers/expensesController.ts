
import { Router } from "express";
import Database from "../Database";
import { authMiddleware } from "../middleware/auth.middleware";

const expenses = Router();

const db = new Database();

expenses.get("/", authMiddleware, async (_, res) => {
    const expenses = await db.find("expenses");
    res.send(expenses);
});
    

expenses.post('/new-expense', authMiddleware, (req, res) => {

});

export default expenses;

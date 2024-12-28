
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";



class Database {
    private connectionUri: string;
    mongodb: MongoClient;
    db: string;

    constructor() {
        this.connectionUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker";
        this.mongodb = new MongoClient(this.connectionUri);
        this.db = "expense-tracker";
    }

    public async connect() {
        try {
            await this.mongodb.connect();
        } catch (error) {
            console.error(error);
        }
    }

    public async find(collection: string) {
        try {
            const db = this.mongodb.db(this.db);
            return await db.collection(collection).find().toArray();
        } catch (error) {
            console.error(error);
        }
    }
    public async insertOne(collection: string, data: any) {
        try {
            const db = this.mongodb.db(this.db);
            return await db.collection(collection).insertOne(data);
        } catch (error) {
            console.error(error);
        }
    }

    public async findOne(collection: string, query: any) {
        try {
            const db = this.mongodb.db(this.db);
            return await db.collection(collection).findOne(query);
        } catch (error) {
            console.error(error);
        }
    }
    
}

export default Database;
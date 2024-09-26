import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import config from '../../config';
import routes from '../../routes';

export class Seed {
    express: express.Application;
    private readonly DB_URL = config.dbUrl;
    private readonly DB_NAME = config.dbRandomName;

    constructor() {
        this.express = express();
        this.middleware();
        this.database();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
    }

    public async database(): Promise<void> {
        try {
            await mongoose.connect(`${this.DB_URL}/${this.DB_NAME}`);
        } catch (error) {
            console.error('Cannot connect to database, error:', error);
        }
    }

    public async deleteAllDocuments(collectionName: string): Promise<void> {
        try {
            await mongoose.connection.collection(collectionName).deleteMany({});
        } catch (error) {
            console.error(`Error deleting documents in ${collectionName}:`, error);
        }
    }

    public async dropDatabase(): Promise<void> {
        try {
            await mongoose.connection.dropDatabase();
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }

    public async insertDataDefault(data: any[], collectionName: string) {
        try {
            await mongoose.connection.collection(collectionName).insertMany(data);
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }

    public async closeDatabaseConnection(): Promise<void> {
        try {
            await mongoose.disconnect();
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }

    private routes(): void {
        this.express.use(routes);
    }

}
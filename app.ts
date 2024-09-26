import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

class App {
    express: express.Application;
    private readonly DB_URL = config.dbUrl;
    private readonly DB_NAME = config.dbName;

    constructor() {
        this.express = express();
        this.middleware();
        this.database();
        this.routes();
        this.swagger();
    }

    private middleware(): void {
        this.express.use(express.json());
    }

    private async database() {
        try {
            await mongoose.connect(`${this.DB_URL}/${this.DB_NAME}`);
            console.log('connect database success');
        } catch (error) {
            console.error('Cannot connect to database, error:', error);
        }
    }

    private routes(): void {
        this.express.use(routes);
    }

    private swagger(): void {
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }
}

export default new App().express;
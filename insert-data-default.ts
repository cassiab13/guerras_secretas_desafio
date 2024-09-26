import { User } from "./src/types/user.types"
import { Model } from "mongoose";
import { setRedis } from "./redisConfig";
import userModel from "./src/schema/user.schema"


export class InsertDataDefault {

    private userModel: Model<User> = userModel;

    public async insert(): Promise<void> {
        this.insertUser();
    }

    private async insertUser(): Promise<void> {

        const user = await this.userModel.findOne({ username: 'superAdmin' });

        if (!user) {

            await this.userModel.create({
                email: 'superAdmin@gmail.com',
                username: 'superAdmin',
                password: '$2b$10$xj0Sj1EufJjA/eu2neMPH./uoxFRrfswmTmUQ/.WN1bd0gZhoX3bO',
                isAdmin: true
            });

            setRedis('insertion-data-default', JSON.stringify(true));

        }

    }
}
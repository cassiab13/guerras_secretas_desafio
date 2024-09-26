import { User } from '../types/user.types';
import { CrudRepository } from './crud.repository';
import { FilterQuery, Model } from 'mongoose';

export class UserRepository extends CrudRepository<User> {
    constructor(model: Model<User>) {
        super(model);
    }

    public findByEmailOrUsername(data: User): Promise<User | null> {
        const query: FilterQuery<User> = {
            $or: [{ email: data.email }, { username: data.username }]
        };

        return this.model.findOne(query);
    }
}

import { Model } from 'mongoose';
import { Creator } from '../types/creator.types';
import { CrudRepository } from './crud.repository';
import { Comic } from '../types/comic.types';

export class CreatorRepository extends CrudRepository<Creator> {
    constructor(model: Model<Creator>) {
        super(model);
    }

    public async create(creator: Creator): Promise<Creator> {
        return this.model.create(creator);
    }

    public async createAll(creators: Creator[]): Promise<void> {
        await this.model.create(creators);
    }

    public async findComicsByCreator(id: string): Promise<Comic[] | null> {
        return this.model
            .findById(id, { comics: 1, _id: 0 })
            .populate('comics');
    }
}

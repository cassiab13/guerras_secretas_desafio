import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { ICrudRepository } from '../interfaces/crud.repository';
import { Find } from '../utils/find.utils';

export abstract class CrudRepository<Entity> implements ICrudRepository<Entity> {
    
    protected readonly model: Model<Entity>;

    constructor(model: Model<Entity>) {
        this.model = model;
    }

    public async create(data: Entity): Promise<Entity | void> {
        this.model.create(data);
    }

    public async update(id: string, data: Entity): Promise<void> {
        await this.model.updateOne({ _id: id } as FilterQuery<Entity>, data as unknown as UpdateQuery<Entity>);
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: id } as FilterQuery<Entity>);
    }

    public async findById(id: string): Promise<Entity | null> {
        return this.model.findById(id);
    }

    public async findAll(): Promise<Entity[]> {
        return this.model.find();
    }

    public async findAllPage(find: Find): Promise<Entity[]> {

        return this.model
            .find(find.filter, find.project)
            .sort(find.sort)
            .populate(find.populate)
            .skip(find.skip)
            .limit(find.pageSize);
    }
}

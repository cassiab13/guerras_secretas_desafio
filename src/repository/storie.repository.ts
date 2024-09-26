import { Model } from "mongoose";
import storieModel from "../schema/storie.schema";
import { Storie } from "../types/storie.types";

export class StorieRepository {

    private storieModel: Model<Storie>;

    constructor() {
        this.storieModel = storieModel;
    }

    public async create(storie: Storie): Promise<Storie> {
        return this.storieModel.create(storie);
    }

    public async findAll(): Promise<Storie[]> {
        return this.storieModel.find();
    }

    public async createAll(stories: Storie[]): Promise<void> {
        await this.storieModel.create(stories);
    }

}
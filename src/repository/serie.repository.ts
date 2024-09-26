import { Model } from "mongoose";
import { Serie } from "../types/serie.types";
import serieModel from "../schema/serie.schema";

export class SerieRepository {

    private serieModel: Model<Serie>;

    constructor() {
        this.serieModel = serieModel;
    }

    public async create(serie: Serie): Promise<Serie> {
        return this.serieModel.create(serie);
    }

    public async findAll(): Promise<Serie[]> {
        return this.serieModel.find();
    }

}
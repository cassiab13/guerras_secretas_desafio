import { Model } from "mongoose";
import { Comic } from '../types/comic.types';
import { CrudRepository } from "./crud.repository";

export class ComicRepository extends CrudRepository<Comic> {

  constructor(model: Model<Comic>) {
    super(model);
  }

  public async create(comic: Comic): Promise<Comic> {
    return this.model.create(comic);
  }

  public async createAll(comics: Comic[]): Promise<void> {
    await this.model.create(comics);
  }
}

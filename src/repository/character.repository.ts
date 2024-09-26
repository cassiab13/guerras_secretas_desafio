import { Model } from 'mongoose';
import { Character } from '../types/character.types';
import { CrudRepository } from './crud.repository';
import { Comic } from '../types/comic.types';
import { Serie } from '../types/serie.types';
import { Image } from '../types/image.types';

export class CharacterRepository extends CrudRepository<Character> {
    constructor(model: Model<Character>) {
        super(model);
    }

    public async create(character: Character): Promise<Character> {
        return this.model.create(character);
    }

    public async createAll(characters: Character[]): Promise<void> {
        await this.model.create(characters);
    }

    public async findComicsByCharacter(id: string): Promise<Comic[] | null> {
        return this.model
            .findById(id, { comics: 1, _id: 0 })
            .populate('comics');
    }

    public async findSeriesByCharacter(id: string): Promise<Serie[] | null> {
        return this.model
            .findById(id, { series: 1, _id: 0 })
            .populate('series');
    }

    public async findThumbnail(id: string): Promise<Image | null> {
        
        return await this.model.findById(id, {
            thumbnail: 1,
            _id: 0
        });
    }
}

import { CharacterRepository } from '../repository/character.repository';
import { CrudService } from './crud.service';
import { Character } from '../types/character.types';
import { Comic } from '../types/comic.types';
import { NotFoundError } from '../utils/errors/not-found.error';
import { StatusCode } from '../enums/status.code';
import { Serie } from '../types/serie.types';
import { Image } from '../types/image.types';

export class CharacterService extends CrudService<Character> {
    protected repository: CharacterRepository;
    constructor(repository: CharacterRepository) {
        super(repository);
        this.repository = repository;
    }

    public async findComicsByCharacter(id: string): Promise<Comic[]> {
        const comics: Comic[] | null =
            await this.repository.findComicsByCharacter(id);
        if (!comics) {
            throw new NotFoundError(
                'Character not found',
                StatusCode.NOT_FOUND
            );
        }
        return comics;
    }

    public async findSeriesByCharacter(id: string): Promise<Serie[]> {
        const series: Serie[] | null =
            await this.repository.findSeriesByCharacter(id);
        if (!series) {
            throw new NotFoundError(
                'Character not found',
                StatusCode.NOT_FOUND
            );
        }
        return series;
    }

    public async findThumbnail(id: string): Promise<Image> {
        const thumbnail: Image | null = await this.repository.findThumbnail(id);
        
        if (!thumbnail) {
            throw new Error('The character does not have a Thumbnail');
        }

        return thumbnail;
    }
}

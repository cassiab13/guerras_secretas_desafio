import { CreatorRepository } from '../repository/creator.repository';
import { CrudService } from './crud.service';
import { Creator } from '../types/creator.types';
import { Comic } from '../types/comic.types';
import { NotFoundError } from '../utils/errors/not-found.error';
import { StatusCode } from '../enums/status.code';

export class CreatorService extends CrudService<Creator> {
    protected repository: CreatorRepository;

    constructor(repository: CreatorRepository) {
        super(repository);
        this.repository = repository;
    }

    public async findComicsByCreator(id: string): Promise<Comic[]> {
        const comics: Comic[] | null = await this.repository.findComicsByCreator(id);
        
        if (!comics) {
            throw new NotFoundError('Creator not found', StatusCode.NOT_FOUND);
        }
        return comics;
    }
}

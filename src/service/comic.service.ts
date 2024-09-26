import { Comic } from '../types/comic.types';
import { CrudService } from './crud.service';
import { ComicRepository } from '../repository/comic.repository';

export class ComicService extends CrudService<Comic> {
    constructor(repository: ComicRepository) {
        super(repository);
    }
}

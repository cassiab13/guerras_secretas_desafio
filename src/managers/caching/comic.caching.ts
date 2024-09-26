import { Comic } from '../../types/comic.types';
import { ComicRepository } from '../../repository/comic.repository';
import comicModel from '../../schema/comic.schema'

export class ComicCaching {

    private static instance: ComicCaching | null = null;
    private static comicById: Map<number, Comic> = new Map();
    private static readonly repository: ComicRepository = new ComicRepository(comicModel);
    
    public static getInstance(): ComicCaching {

        if(!ComicCaching.instance) {
            ComicCaching.instance = new ComicCaching();
        }

        return ComicCaching.instance;
    }

    public clear() {
        ComicCaching.comicById.clear();
        ComicCaching.instance = null;
    }

    public async findComic(comic: Comic): Promise<Comic> {
        
        if (ComicCaching.comicById.has(comic.id)) {
            return ComicCaching.comicById.get(comic.id)!;
        }

        return this.saveComic(comic);
    }

    private async saveComic(comic: Comic): Promise<Comic> {

        const newComic: Comic = await ComicCaching.repository.create(comic);
        ComicCaching.comicById.set(comic.id, newComic);
        
        return newComic; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const comics: Comic[] = await ComicCaching.repository.findAll();
        comics.map(comic => {
            ComicCaching.comicById.set(comic.id, comic);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}
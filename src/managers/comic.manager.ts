import { SaveCreatorHandler } from '../handlers/save-creator.handler';
import { Manager } from './manager';
import { Serie } from '../types/serie.types';
import { SaveCharacterHandler } from '../handlers/save-character.handler';
import { SaveStorieHandler } from '../handlers/save-storie.handler';
import { SaveEventHandler } from '../handlers/save-event.handler';
import { CollectionURI } from '../dto/external/collection-uri.dto';
import { ResponseAPI } from '../dto/external/response-api.dto';
import { ComicExternal } from '../dto/external/comic-external.dto';
import { Request } from '../utils/request.utils';
import { Comic } from '../types/comic.types';
import { ComicAdapter } from '../adapter/comic.adapter';
import { ComicCaching } from './caching/comic.caching';
import { ComicRepository } from '../repository/comic.repository';
import comicModel from '../schema/comic.schema';

export class ComicManager implements Manager {

    private comicAdapter: ComicAdapter = new ComicAdapter();
    private comicCaching: ComicCaching = ComicCaching.getInstance();
    private comicRepository: ComicRepository = new ComicRepository(comicModel);

    public async save(serie: Serie): Promise<void> {

        console.time('comic');
        const response: ResponseAPI<ComicExternal>[] = await Request.findByCollection(serie.comics as CollectionURI);
        const allComics: ComicExternal[] = response.flatMap(response => response.data.results);

        const newComics: Comic[] = [];
        await Promise.all(allComics.map(async (comicExternal: ComicExternal) => {

            const comic: Comic = await this.comicAdapter.toInternalSave(comicExternal);
            const newComic: Comic = await this.comicCaching.findComic(comic);
            
            const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(newComic, comicExternal.creators as CollectionURI);
            const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(newComic, comicExternal.characters as CollectionURI);
            const saveStorie: SaveStorieHandler = new SaveStorieHandler(newComic, comicExternal.stories as CollectionURI);
            const saveEvent: SaveEventHandler = new SaveEventHandler(newComic, comicExternal.events as CollectionURI);

            saveCreator.setNext(saveCharacter);
            saveCharacter.setNext(saveStorie);
            saveStorie.setNext(saveEvent);

            await saveCreator.save();
            newComics.push(newComic);

        }));

        this.comicRepository.createAll(newComics);
        console.timeEnd('comic');

    }

}
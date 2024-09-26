import { SaveCreatorHandler } from '../handlers/save-creator.handler';
import { Manager } from './manager';
import { Serie } from '../types/serie.types';
import { SaveCharacterHandler } from '../handlers/save-character.handler';
import { SaveEventHandler } from '../handlers/save-event.handler';
import { CollectionURI } from '../dto/external/collection-uri.dto';
import { ResponseAPI } from '../dto/external/response-api.dto';
import { Request } from '../utils/request.utils';
import { StorieAdapter } from '../adapter/storie.adapter';
import { StorieCaching } from './caching/storie.caching';
import { StorieRepository } from '../repository/storie.repository';
import { StorieExternal } from '../dto/external/storie-external.dto';
import { Storie } from '../types/storie.types';
import { SaveSerieHandler } from '../handlers/save-serie.handler';
import { SaveComicHandler } from '../handlers/save-comic.handler';

export class StorieManager implements Manager {

    private readonly storieAdapter: StorieAdapter = new StorieAdapter();
    private readonly storieCaching: StorieCaching = StorieCaching.getInstance();
    private readonly storieRepository: StorieRepository = new StorieRepository();

    public async save(serie: Serie): Promise<void> {

        console.time('storie')
        const response: ResponseAPI<StorieExternal>[] = await Request.findByCollection(serie.stories as CollectionURI);
        const allStories: StorieExternal[] = response.flatMap(response => response.data.results);

        const newStories: Storie[] = [];
        await Promise.all(allStories.map(async (externalCharacter: StorieExternal) => {

            const storie: Storie = await this.storieAdapter.toInternalSave(externalCharacter);
            const newStorie: Storie = await this.storieCaching.findStorie(storie);
            
            const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(newStorie, externalCharacter.creators as CollectionURI);
            const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(newStorie, externalCharacter.characters as CollectionURI);
            const saveSerie: SaveSerieHandler = new SaveSerieHandler(newStorie, externalCharacter.series as CollectionURI);
            const saveComic: SaveComicHandler = new SaveComicHandler(newStorie, externalCharacter.comics as CollectionURI);
            const saveEvent: SaveEventHandler = new SaveEventHandler(newStorie, externalCharacter.events as CollectionURI);

            saveCreator.setNext(saveCharacter);
            saveCharacter.setNext(saveSerie);
            saveSerie.setNext(saveComic);
            saveComic.setNext(saveEvent);

            await saveCreator.save();
            newStories.push(newStorie);

        }));

        this.storieRepository.createAll(newStories);
        console.timeEnd('storie');

    }

}
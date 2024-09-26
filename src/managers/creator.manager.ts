import { Manager } from './manager';
import { Serie } from '../types/serie.types';
import { SaveStorieHandler } from '../handlers/save-storie.handler';
import { SaveEventHandler } from '../handlers/save-event.handler';
import { CollectionURI } from '../dto/external/collection-uri.dto';
import { ResponseAPI } from '../dto/external/response-api.dto';
import { Request } from '../utils/request.utils';
import { CreatorAdapter } from '../adapter/creator.adapter';
import { CreatorCaching } from './caching/creator.caching';
import { CreatorRepository } from '../repository/creator.repository';
import { CreatorExternal } from '../dto/external/creator-external.dto';
import { Creator } from '../types/creator.types';
import { SaveSerieHandler } from '../handlers/save-serie.handler';
import { SaveComicHandler } from '../handlers/save-comic.handler';
import creatorModel from '../schema/creator.schema';

export class CreatorManager implements Manager {
    private readonly creatorAdapter: CreatorAdapter = new CreatorAdapter();
    private readonly creatorCaching: CreatorCaching = CreatorCaching.getInstance();
    private readonly creatorRepository: CreatorRepository = new CreatorRepository(creatorModel);

    public async save(serie: Serie): Promise<void> {
        console.time('creator');
        const response: ResponseAPI<CreatorExternal>[] = await Request.findByCollection(serie.creators as CollectionURI);
        const allCreators: CreatorExternal[] = response.flatMap(response => response.data.results);

        const newCreators: Creator[] = [];
        await Promise.all(
            allCreators.map(async (creatorExternal: CreatorExternal) => {
                const creator: Creator =
                    await this.creatorAdapter.toInternalSave(creatorExternal);
                const newCreator: Creator =
                    await this.creatorCaching.findCreator(creator);

                const saveSerie: SaveSerieHandler = new SaveSerieHandler(
                    newCreator,
                    creatorExternal.series as CollectionURI
                );
                const saveStorie: SaveStorieHandler = new SaveStorieHandler(
                    newCreator,
                    creatorExternal.stories as CollectionURI
                );
                const saveEvent: SaveEventHandler = new SaveEventHandler(
                    newCreator,
                    creatorExternal.events as CollectionURI
                );
                const saveComic: SaveComicHandler = new SaveComicHandler(
                    newCreator,
                    creatorExternal.comics as CollectionURI
                );

                saveSerie.setNext(saveStorie);
                saveStorie.setNext(saveEvent);
                saveEvent.setNext(saveComic);

                await saveSerie.save();
                newCreators.push(newCreator);
            })
        );

        this.creatorRepository.createAll(newCreators);
        console.timeEnd('creator');
    }
}
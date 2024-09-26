import { Manager } from './manager';
import { Serie } from '../types/serie.types';
import { SaveStorieHandler } from '../handlers/save-storie.handler';
import { CollectionURI } from '../dto/external/collection-uri.dto';
import { ResponseAPI } from '../dto/external/response-api.dto';
import { Request } from '../utils/request.utils';
import { SaveComicHandler } from '../handlers/save-comic.handler';
import { SaveSerieHandler } from '../handlers/save-serie.handler';
import { EventAdapter } from '../adapter/event.adapter';
import { EventCaching } from './caching/event.caching';
import { EventRepository } from '../repository/event.repository';
import { EventExternal } from '../dto/external/event-external.dto';
import { SaveCreatorHandler } from '../handlers/save-creator.handler';
import { SaveCharacterHandler } from '../handlers/save-character.handler';
import { Event } from '../types/event.types';

export class EventManager implements Manager {

    private adapter: EventAdapter = new EventAdapter();
    private caching: EventCaching = EventCaching.getInstance();
    private repository: EventRepository = new EventRepository();

    public async save(serie: Serie) {

        console.time('event');
        const response: ResponseAPI<EventExternal>[] = await Request.findByCollection(serie.events as CollectionURI);
        const allEvents: EventExternal[] = response.flatMap(response => response.data.results);

        const newEvents: Event[] = [];
        await Promise.all(allEvents.map(async (eventExternal: EventExternal) => {

            const event: Event = await this.adapter.toInternalSave(eventExternal);
            const newEvent: Event = await this.caching.findEvent(event);
            
            const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(newEvent, eventExternal.creators as CollectionURI);
            const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(newEvent, eventExternal.characters as CollectionURI);
            const saveStorie: SaveStorieHandler = new SaveStorieHandler(newEvent, eventExternal.stories as CollectionURI);
            const saveComic: SaveComicHandler = new SaveComicHandler(newEvent, eventExternal.comics as CollectionURI);
            const saveSerie: SaveSerieHandler = new SaveSerieHandler(newEvent, eventExternal.series as CollectionURI);

            saveCreator.setNext(saveCharacter);
            saveCharacter.setNext(saveStorie);
            saveStorie.setNext(saveComic);
            saveComic.setNext(saveSerie);

            await saveCreator.save();
            newEvents.push(newEvent);

        }));

        this.repository.createAll(newEvents);
        console.timeEnd('event');
    }

}
import { Manager } from './manager';
import { Serie } from '../types/serie.types';
import { SaveStorieHandler } from '../handlers/save-storie.handler';
import { SaveEventHandler } from '../handlers/save-event.handler';
import { CollectionURI } from '../dto/external/collection-uri.dto';
import { ResponseAPI } from '../dto/external/response-api.dto';
import { Request } from '../utils/request.utils';
import { CharacterAdapter } from '../adapter/character.adapter';
import { CharacterCaching } from './caching/character.caching';
import { CharacterRepository } from '../repository/character.repository';
import { CharacterExternal } from '../dto/external/character-external.dto';
import { Character } from '../types/character.types';
import { SaveComicHandler } from '../handlers/save-comic.handler';
import { SaveSerieHandler } from '../handlers/save-serie.handler';
import characterModel from '../schema/character.schema';

export class CharacterManager implements Manager {
    private readonly adapter: CharacterAdapter = new CharacterAdapter();
    private readonly caching: CharacterCaching = CharacterCaching.getInstance();
    private readonly repository: CharacterRepository = new CharacterRepository(
        characterModel
    );

    public async save(serie: Serie): Promise<void> {
        console.time('character');
        const response: ResponseAPI<CharacterExternal>[] =
            await Request.findByCollection(serie.characters as CollectionURI);
        const allCharacters: CharacterExternal[] = response.flatMap(
            response => response.data.results
        );

        const newCharacters: Character[] = [];
        await Promise.all(
            allCharacters.map(async (externalCharacter: CharacterExternal) => {
                const character: Character = await this.adapter.toInternalSave(
                    externalCharacter
                );
                const newCharacter: Character =
                    await this.caching.findCharacter(character);

                const saveComic: SaveComicHandler = new SaveComicHandler(
                    newCharacter,
                    externalCharacter.comics as CollectionURI
                );
                const saveSerie: SaveSerieHandler = new SaveSerieHandler(
                    newCharacter,
                    externalCharacter.series as CollectionURI
                );
                const saveStorie: SaveStorieHandler = new SaveStorieHandler(
                    newCharacter,
                    externalCharacter.stories as CollectionURI
                );
                const saveEvent: SaveEventHandler = new SaveEventHandler(
                    newCharacter,
                    externalCharacter.events as CollectionURI
                );

                saveComic.setNext(saveSerie);
                saveSerie.setNext(saveStorie);
                saveStorie.setNext(saveEvent);

                await saveComic.save();
                newCharacters.push(newCharacter);
            })
        );

        this.repository.createAll(newCharacters);
        console.timeEnd('character');
    }
}
import { SerieAdapter } from "../adapter/serie.adapter";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { SerieExternal } from "../dto/external/serie-external.dto";
import { Request } from "../utils/request.utils";
import { UrlExternalUtils } from "../utils/url.utils";
import { SerieCaching } from "./caching/serie.caching";
import { Serie } from "../types/serie.types";
import { SaveCreatorHandler } from "../handlers/save-creator.handler";
import { CollectionURI } from "../dto/external/collection-uri.dto";
import { SaveCharacterHandler } from "../handlers/save-character.handler";
import { SaveComicHandler } from "../handlers/save-comic.handler";
import { SaveStorieHandler } from "../handlers/save-storie.handler";
import { SaveEventHandler } from "../handlers/save-event.handler";

export class SerieManager {

    private readonly serieAdapter: SerieAdapter = new SerieAdapter();
    private readonly serieCaching: SerieCaching = SerieCaching.getInstance();

    public async save(serieExternal: SerieExternal): Promise<Serie> {

        const serie: Serie = await this.serieAdapter.toInternal(serieExternal);
        const newSerie: Serie = await this.updateFieldsSerie(serie);

        await this.serieCaching.find(newSerie);
        return serieExternal;
    }

    private async updateFieldsSerie(serie: Serie): Promise<Serie> {

        const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(serie, serie.creators as CollectionURI);
        const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(serie, serie.characters as CollectionURI);
        const saveComic: SaveComicHandler = new SaveComicHandler(serie, serie.comics as CollectionURI);
        const saveStorie: SaveStorieHandler = new SaveStorieHandler(serie, serie.stories as CollectionURI);
        const saveEvent: SaveEventHandler = new SaveEventHandler(serie, serie.events as CollectionURI);

        saveCreator.setNext(saveCharacter);
        saveCharacter.setNext(saveComic);
        saveComic.setNext(saveStorie);
        saveStorie.setNext(saveEvent);

        return saveCreator.save();

    }

}
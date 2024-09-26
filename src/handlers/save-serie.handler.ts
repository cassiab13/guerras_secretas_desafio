import { CollectionURI } from '../dto/external/collection-uri.dto';
import { Serie } from "../types/serie.types";
import { SaveHandler } from "./save.handler";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { Request } from "../utils/request.utils";
import { SerieAdapter } from "../adapter/serie.adapter";
import { SerieExternal } from "../dto/external/serie-external.dto";
import { SerieCaching } from '../managers/caching/serie.caching';

export class SaveSerieHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private serieAdapter: SerieAdapter = new SerieAdapter();
    private serieCaching: SerieCaching = SerieCaching.getInstance();
    private entity: any;
    private collectionUri: CollectionURI;

    constructor(entity: any, collectionUri: CollectionURI) {
        this.entity = entity;
        this.collectionUri = collectionUri;
    }

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(): Promise<any> {
        
        const response: ResponseAPI<SerieExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterSeries(this.entity, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.entity;

    }

    private async filterSeries(type: any, response: ResponseAPI<SerieExternal>[]): Promise<void> {

        type.series = [];
        const allSeries: SerieExternal[] = response.map(response => response.data?.results).flat();
        const sizeSeries: number = allSeries.length;
        
        for (let i = 0; i < sizeSeries; i++) {

            const serie: Serie = await this.serieAdapter.toInternalSave(allSeries[i]);
            const newSerie: Serie = await this.serieCaching.find(serie);

            type.series.push(newSerie);
            
        }
    
    }

}
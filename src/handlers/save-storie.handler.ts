import { StorieCaching } from "../managers/caching/storie.caching";
import { StorieAdapter } from "../adapter/storie.adapter";
import { SaveHandler } from "./save.handler";
import { CollectionURI } from "../dto/external/collection-uri.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { Request } from "../utils/request.utils";
import { StorieExternal } from "../dto/external/storie-external.dto";
import { Storie } from "../types/storie.types";

export class SaveStorieHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private storieAdapter: StorieAdapter = new StorieAdapter();
    private storieCaching: StorieCaching = StorieCaching.getInstance();
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

        const response: ResponseAPI<StorieExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterStories(this.entity, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.entity;

    }

    private async filterStories(type: any, response: ResponseAPI<StorieExternal>[]): Promise<void> {

        type.stories = [];
        const allStories: StorieExternal[] = response.map(response => response.data?.results).flat();
        const sizeStories: number = allStories.length;
        
        for (let i = 0; i < sizeStories; i++) {

            const storie: Storie = await this.storieAdapter.toInternalSave(allStories[i]);
            const newStorie: Storie = await this.storieCaching.findStorie(storie);

            type.stories.push(newStorie);
            
        }
    
    }

}
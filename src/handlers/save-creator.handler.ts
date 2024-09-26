import { CreatorAdapter } from '../adapter/creator.adapter';
import { Creator } from '../types/creator.types';
import { CreatorCaching } from '../managers/caching/creator.caching';
import { SaveHandler } from "./save.handler";
import { Request } from "../utils/request.utils";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { CreatorExternal } from '../dto/external/creator-external.dto';
import { CollectionURI } from '../dto/external/collection-uri.dto';

export class SaveCreatorHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null
    private creatorCaching: CreatorCaching = CreatorCaching.getInstance();
    private creatorAdapter: CreatorAdapter = new CreatorAdapter();
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

        const response: ResponseAPI<CreatorExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterCreators(this.entity, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.entity;

    }

    private async filterCreators(type: any, response: ResponseAPI<CreatorExternal>[]): Promise<void> {

        type.creators = [];
        const allCreators: CreatorExternal[] = response.flatMap(response => response.data?.results);
        const sizeCreators: number = allCreators.length;
        
        for (let i = 0; i < sizeCreators; i++) {

            const creator: Creator = await this.creatorAdapter.toInternalSave(allCreators[i]);
            const newCreator: Creator = await this.creatorCaching.findCreator(creator);

            type.creators.push(newCreator);            
        }
    
    }

}
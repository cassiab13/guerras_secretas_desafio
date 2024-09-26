import { SaveHandler } from "./save.handler";
import { ComicAdapter } from "../adapter/comic.adapter";
import { ComicCaching } from "../managers/caching/comic.caching";
import { CollectionURI } from "../dto/external/collection-uri.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { ComicExternal } from "../dto/external/comic-external.dto";
import { Request } from "../utils/request.utils";
import { Comic } from "../types/comic.types";

export class SaveComicHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private comicAdapter: ComicAdapter = new ComicAdapter();
    private comicCaching: ComicCaching = ComicCaching.getInstance();
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

        const response: ResponseAPI<ComicExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterComics(this.entity, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.entity;

    }

    private async filterComics(type: any, response: ResponseAPI<ComicExternal>[]): Promise<void> {


        type.comics = [];
        const allComics: ComicExternal[] = response.map(response => response.data?.results).flat();
        const sizeComics: number = allComics.length;
        
        for (let i = 0; i < sizeComics; i++) {

            const comic: Comic = await this.comicAdapter.toInternalSave(allComics[i]);
            const newComic: Comic = await this.comicCaching.findComic(comic);

            type.comics.push(newComic);
            
        }
    
    }

}
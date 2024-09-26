import { EventExternal } from "../dto/external/event-external.dto";
import { Event } from "../types/event.types";
import { Adapter } from "./adapter";
import { ImageAdapter } from "./image.adapter";

export class EventAdapter {

    private imageAdapter: ImageAdapter = new ImageAdapter();

    public async toInternalSave(external: EventExternal): Promise<Event> {

        const image = await this.imageAdapter.toInternal(external?.thumbnail);
        const modified: Date = new Date(external?.modified); 
        const date: Date | null = isNaN(modified.getTime()) ? null : modified;
        
        return {
            id: external.id,
            title: external.title,
            description: external.description,
            resourceURI: external.resourceURI,
            modified: date,
            start: external.start,
            end: external.end,
            thumbnail: image,
            comics: [],
            stories: [], 
            series: [], 
            characters: [],
            creators: []
        };
    }

}
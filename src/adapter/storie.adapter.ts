import { StorieExternal } from "../dto/external/storie-external.dto";
import { Adapter } from "./adapter";
import { Storie } from "../types/storie.types";
import { ImageAdapter } from "./image.adapter";

export class StorieAdapter {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternalSave(external: StorieExternal): Promise<Storie> {
    
    const image = await this.imageAdapter.toInternal(external?.thumbnail);
    const modified: Date = new Date(external?.modified); 
    const date: Date | null = isNaN(modified.getTime()) ? null : modified;
    
    return {
      id: external.id,
      title: external.title,
      description: external.description,
      resourceURI: external.resourceURI,
      type: external.type,
      modified: date,
      thumbnail: image,
      comics: [],
      series: [],
      events: [],
      characters: [],
      creators: [],
    };
  }
}

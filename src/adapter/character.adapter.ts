import { CharacterExternal } from "../dto/external/character-external.dto";
import { Adapter } from "./adapter";
import { ImageAdapter } from "./image.adapter";
import { Character } from "../types/character.types";

export class CharacterAdapter {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternalSave(external: CharacterExternal): Promise<Character> {
  
    const image = await this.imageAdapter.toInternal(external?.thumbnail);
    const modified: Date = new Date(external?.modified); 
    const date: Date | null = isNaN(modified.getTime()) ? null : modified;

    return {
      id: external.id,
      name: external.name,
      description: external.description,
      modified: date,
      resourceURI: external.resourceURI,
      thumbnail: image,
      comics: [],
      stories: [],
      events: [],
      series: [],
    };
  }
}

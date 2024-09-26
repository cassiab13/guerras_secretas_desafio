import { Adapter } from "./adapter";
import { Creator } from "../types/creator.types";
import { ImageAdapter } from "./image.adapter";
import { CreatorExternal } from "../dto/external/creator-external.dto";

export class CreatorAdapter {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternalSave(external: CreatorExternal): Promise<Creator> {
  
    const image = await this.imageAdapter.toInternal(external?.thumbnail);
    const modified: Date = new Date(external?.modified); 
    const date: Date | null = isNaN(modified.getTime()) ? null : modified;

    return {
      id: external.id,
      firstName: external.firstName,
      middleName: external.middleName,
      lastName: external.lastName,
      suffix: external.suffix,
      fullName: external.fullName,
      role: external.role,
      modified: date,
      resourceURI: external.resourceURI,
      thumbnail: image,
      series: [],
      stories: [],
      comics: [],
      events: [],
    };
  }
}

import { ComicDateExternal } from "../dto/external/comic-date-external.dto";
import { Adapter } from "./adapter";
import { ComicDate } from "../types/comic-date.types";

export class ComicDateAdapter implements Adapter<ComicDateExternal, ComicDate> {

  public async toInternal(external: ComicDateExternal): Promise<ComicDate> {
    
    return {
      type: external.type,
      date: external.date,
    };
  }
}

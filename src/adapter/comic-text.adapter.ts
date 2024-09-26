import { ComicTextExternal } from "src/dto/external/comic-text-external.dto";
import { Adapter } from "./adapter";
import { ComicText } from "src/types/comit-text.types";

export class ComicTextAdapter implements Adapter<ComicTextExternal, ComicText> {

  public async toInternal(external: ComicTextExternal): Promise<ComicText> {

    return {
      type: external.type,
      language: external.language,
      text: external.text,
    };
  }
}

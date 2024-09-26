import { ComicPrice } from "./../types/comic-price.types";
import { ComicPriceExternal } from "./../dto/external/comic-price-external.dto";
import { Adapter } from "./adapter";

export class ComicPriceAdapter implements Adapter<ComicPriceExternal, ComicPrice> {

  public async toInternal(external: ComicPriceExternal): Promise<ComicPrice> {

    return {
      type: external.type,
      price: external.price,
    };
  }
}

import { ImageAdapter } from './image.adapter';
import { Adapter } from "./adapter";
import { Comic } from "../types/comic.types";
import { Image } from "../types/image.types";
import { ComicDateAdapter } from './comic-date.adapter';
import { ComicPriceAdapter } from './comic-price.adapter';
import { ComicDate } from '../types/comic-date.types';
import { ComicPrice } from '../types/comic-price.types';
import { ComicText } from '../types/comit-text.types';
import { ComicTextAdapter } from './comic-text.adapter';
import { ComicExternal } from '../dto/external/comic-external.dto';

export class ComicAdapter {

  private imageAdapter: ImageAdapter = new ImageAdapter();
  private comicDateAdapter: ComicDateAdapter = new ComicDateAdapter();
  private comicPriceAdapter: ComicPriceAdapter = new ComicPriceAdapter();
  private comicTextAdapter: ComicTextAdapter = new ComicTextAdapter();

  public async toInternalSave(external: ComicExternal): Promise<Comic> {
    
    const adaptAndResolve = async <T, U>(items: T[] | undefined, adapter: (item: T) => Promise<U>): Promise<U[]> => {
        if (!items) return [];
    
        return Promise.all(items.map(adapter));
    };

    const image = await this.imageAdapter.toInternal(external?.thumbnail);
    const images: Image[] = await adaptAndResolve(external.images, image => this.imageAdapter.toInternal(image));
    const dates: ComicDate[] = await adaptAndResolve(external.dates, date => this.comicDateAdapter.toInternal(date));
    const prices: ComicPrice[] = await adaptAndResolve(external.prices, price => this.comicPriceAdapter.toInternal(price));
    const texts: ComicText[] = await adaptAndResolve(external.textObjects, text => this.comicTextAdapter.toInternal(text));
    const modified: Date = new Date(external?.modified); 
    const date: Date | null = isNaN(modified.getTime()) ? null : modified;

    return {
      id: external.id,
      digitalId: external.digitalId,
      title: external.title,
      issueNumber: external.issueNumber,
      variantDescription: external.variantDescription,
      description: external.description,
      modified: date,
      isbn: external.isbn,
      upc: external.upc,
      diamondCode: external.diamondCode,
      ean: external.ean,
      issn: external.issn,
      format: external.format,
      pageCount: external.pageCount,
      resourceURI: external.resourceURI,
      textObjects: texts,
      dates: dates,
      prices: prices,
      thumbnail: image,
      images: images,
      creators: [],
      characters: [],
      stories: [],
      events: [],
    };
  }

}

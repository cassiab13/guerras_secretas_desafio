import { ImageExternal } from "../dto/external/image-external.dto";
import { Image } from "../types/image.types";
import { Adapter } from "./adapter";

export class ImageAdapter implements Adapter<ImageExternal, Image> {

    public toInternal(external: ImageExternal): Promise<Image> {

        const image = external || {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
          };
        
        return Promise.resolve({
            path: image.path,
            extension: image.extension
        });
    }

}
import { error } from "console";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { SerieExternal } from "../dto/external/serie-external.dto";
import { StatusCode } from "../enums/status.code";
import { PopulateManager } from "../managers/populate.manager";
import { Request } from "../utils/request.utils";
import { UrlExternalUtils } from "../utils/url.utils";
import { NotFoundError } from "../utils/errors/not-found.error";

export class PopulateService {

   private populateManager: PopulateManager = new PopulateManager();

   public async serie(idSerie: string, fieldsForUpdates: any) {

      const url = UrlExternalUtils.generateFind("series", idSerie);
      const response: ResponseAPI<SerieExternal> = await Request.findByUrl(url);

      if (response.code === StatusCode.NOT_FOUND) {
         throw new NotFoundError("Serie not found in Marvel API", StatusCode.NOT_FOUND);
      }

      const serie: SerieExternal = response.data.results[0];
      this.populateManager.saveSerie(serie, fieldsForUpdates);
   }
   
}
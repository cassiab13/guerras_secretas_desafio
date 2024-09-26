import { Comic } from "src/types/comic.types";
import { CrudController } from "./crud.controller";
import { ComicService } from "src/service/comic.service";

export class ComicController extends CrudController<Comic> {

    constructor(service: ComicService) {
        super(service); 
    }

}
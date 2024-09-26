import { ResponseData } from "./response-data.dto";

export interface ResponseAPI<T> {
    code: number,
    status: string,
    data: ResponseData<T>
}
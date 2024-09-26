import { Pagination } from "./pagination.types";

export interface ResponseApi<Data> {
    statusCode: number,
    pagination: Pagination
    data: Data
}
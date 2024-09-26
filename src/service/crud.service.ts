import { KeyRedis } from "../utils/key-redis.utils";
import { StatusCode } from "../enums/status.code";
import { ICrudRepository } from "../interfaces/crud.repository";
import { ICrudService } from "../interfaces/crud.service";
import { NotFoundError } from "../utils/errors/not-found.error";
import { deleteCacheRedis, getRedis, setRedis } from '../../redisConfig';
import { Find } from "../utils/find.utils";
import { ResponseApi } from "../types/response-api.types";

export abstract class CrudService<Entity> implements ICrudService<Entity> {
    protected readonly repository: ICrudRepository<Entity>;

    constructor(repository: ICrudRepository<Entity>) {
        this.repository = repository;
    }

    public async create(data: Entity): Promise<void> {
        this.repository.create(data);
        await deleteCacheRedis();
    }

    public async update(id: string, data: Entity): Promise<void> {
        await this.findById(id);
        this.repository.update(id, data);
        await deleteCacheRedis();
    }

    public async delete(id: string): Promise<void> {
        this.repository.delete(id);
        await deleteCacheRedis();
    }

    public async find(id: string): Promise<Entity> {
        return this.findById(id);
    }

    public async findAll(find: Find): Promise<ResponseApi<Entity[]>> {
        const hashRedis: string = KeyRedis.findPage(this.getClassName(), find);
        const value: string | null | undefined = await getRedis(hashRedis);

        if (value) {
            return this.generateResponse(JSON.parse(value), find);
        }

        const result: Entity[] = await this.repository.findAllPage(find);
        setRedis(hashRedis, JSON.stringify(result));
        return this.generateResponse(result, find);
    }

    private generateResponse(result: Entity[], find: Find): ResponseApi<Entity[]> {
        
        return {
            statusCode: StatusCode.SUCCESS,
            pagination: {
                perPage: find.pageSize,
                currentPage: find.page
            },
            data: result
        };
    }

    private async findById(id: string): Promise<Entity> {
        const value: Entity | null = await this.repository.findById(id);

        if (!value) {
            throw new NotFoundError(`${id} not found`, StatusCode.NOT_FOUND);
        }

        return value;
    }

    public getClassName(): string {
        return this.constructor.name;
    }
}

import { Find } from "../utils/find.utils";

export interface ICrudRepository<Entity> {
    findAll(): Promise<Entity[]>;

    findAllPage(find: Find): Promise<Entity[]>;

    findById(id: string): Promise<Entity | null>;

    create(data: Entity): Promise<Entity | void>;

    update(id: string, data: Entity): Promise<void>;

    delete(id: string): Promise<void>;
}

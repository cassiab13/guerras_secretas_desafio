import { User } from '../types/user.types';
import { CrudService } from './crud.service';
import { Password } from '../utils/password.utils';
import { UserRepository } from '../repository/user.repository';
import { NotFoundError } from '../utils/errors/not-found.error';
import { StatusCode } from '../enums/status.code';
import { UnauthorizedError } from '../utils/errors/unauthorized.error';
import { Token } from '../utils/token.utils';
import { deleteCacheRedis } from '../../redisConfig';

export class UserService extends CrudService<User> {
    protected readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        super(repository);
        this.repository = repository;
    }

    public async create(data: User): Promise<void> {
        data.password = await Password.generate(data.password);
        this.repository.create(data);
        deleteCacheRedis();
    }

    public async auth(data: User): Promise<string> {
        const user: User = await this.findByEmailOrUsername(data);

        if (!Password.verify(user.password, data.password)) {
            throw new UnauthorizedError(
                'User not authorized',
                StatusCode.UNAUTHORIZED
            );
        }

        return Token.generate(user);
    }

    private async findByEmailOrUsername(data: User) {
        const user: User | null = await this.repository.findByEmailOrUsername(data);

        if (!user) {
            throw new NotFoundError('User not found', StatusCode.NOT_FOUND);
        }

        return user;
    }
}

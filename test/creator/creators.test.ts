import supertest from 'supertest';
import { Seed } from '../config/seed';
import { creators } from './data.creator';
import { comics } from '../comic/data.comics';
import { closeRedisConnection, deleteCacheRedis } from '../../redisConfig';
import { StatusCode } from '../../src/enums/status.code';

describe('Creators', () => {
    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await deleteCacheRedis();
        await seed.deleteAllDocuments('creators');
        await seed.deleteAllDocuments('comics');
        await seed.insertDataDefault(comics, 'comics');
        await seed.insertDataDefault(creators, 'creators');
        await deleteCacheRedis();
    });

    afterAll(async () => {
        await seed.dropDatabase();
        await seed.closeDatabaseConnection();
        await deleteCacheRedis();
        await closeRedisConnection();
    });

    describe('GET /creators/:id/comics', () => {
        it('should find a Comic by Creator', async () => {
            const creatorId = '551318e10b061b35263b93d1';
            const response = await request.get(`/creators/${creatorId}/comics`);
            const result = response.body;

            expect(result.comics[0].id).toBe(3);
            expect(result.comics[0].title).toBe('Comic3');
        });
    });
});

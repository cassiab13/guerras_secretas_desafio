import supertest from 'supertest';
import { Seed } from '../config/seed';
import { characters } from './data.character';
import { comics } from '../comic/data.comics';
import { series } from '../serie/data.serie';
import { closeRedisConnection, deleteCacheRedis } from '../../redisConfig';
import { StatusCode } from '../../src/enums/status.code';

describe('Characters', () => {
    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('characters');
        await seed.deleteAllDocuments('comics');
        await seed.deleteAllDocuments('series');
        await seed.insertDataDefault(comics, 'comics');
        await seed.insertDataDefault(characters, 'characters');
        await seed.insertDataDefault(series, 'series');
        await deleteCacheRedis();
    });

    afterAll(async () => {
        await seed.dropDatabase();
        await seed.closeDatabaseConnection();
        await deleteCacheRedis();
        await closeRedisConnection();
    });

    describe('GET /characters', () => {
        it('should return characters', async () => {
            const response = await request.get('/characters');
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.data.length).toEqual(5);
            expect(result.data[1].name).toEqual('Hero2');
            expect(result.data[3].id).toEqual(4);
        });
    });

    describe('GET /characters/:id', () => {
        it('should return user by id', async () => {
            const characterId = '661318e10b061b35263b93d0';
            const response = await request.get(`/characters/${characterId}`);
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.name).toBe('Hero1');
            expect(result.resourceURI).toBe('resource1');
        });

        it('should return Id not found', async () => {
            const characterId = '661318e10b061b35263b93d6';
            const response = await request.get(`/characters/${characterId}`);
            const result = response.body;

            expect(response.statusCode).toEqual(404);
            expect(result.message).toBe('661318e10b061b35263b93d6 not found');
        });

        it('should return thumbnail character', async () => {
            const characterId = '661318e10b061b35263b93d0';
            const response = await request.get(
                `/characters/${characterId}/thumbnail`
            );
            const result = response.body;
            
            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.thumbnail.path).toBe('https://hero1.com');
            expect(result.thumbnail.extension).toBe('jpg');
        });
    });

    describe('GET /characters/:id/comics', () => {
        it('should find a Comic by Character', async () => {
            const characterId = '661318e10b061b35263b93d1';
            const response = await request.get(
                `/characters/${characterId}/comics`
            );
            const result = response.body;

            expect(result.comics[0].digitalId).toBe(1);
            expect(result.comics[0].isbn).toBe('1');
            expect(result.comics[1].title).toBe('Comic22');
        });
        it('should not find a Comic by Character', async () => {
            const characterId = '661318e10b061b35263b93d7';
            const response = await request.get(
                `/characters/${characterId}/comics`
            );
            const result = response.body;
            expect(result.message).toBe('Character not found');
        });
    });

    describe('GET /characters/:id/series', () => {
        it('should find a Serie by Character', async () => {
            const characterId = '661318e10b061b35263b93d1';
            const response = await request.get(
                `/characters/${characterId}/series`
            );
            const result = response.body;
            expect(result.series[0].id).toBe(2);
            expect(result.series[0].title).toBe('Serie2');
            expect(result.series[0].startYear).toBe(2023);
        });

        it('should not find a Serie by Character', async () => {
            const characterId = '661318e10b061b35263b93d7';
            const response = await request.get(
                `/characters/${characterId}/series`
            );
            const result = response.body;
            expect(result.message).toBe('Character not found');
        });
    });

    describe('POST /characters', () => {
        it('should return created character', async () => {
            let responseCharacters = await request.get('/characters');
            let resultCharacters = responseCharacters.body;

            expect(resultCharacters.data.length).toEqual(5);

            const newCharacter = {
                id: 8,
                name: 'Hero8',
                description: 'description',
                resourceURI: 'resource8',
                thumbnail: {
                    path: 'Testezinho :)',
                    extension: 'jpg'
                }
            };

            const response = await request
                .post('/characters')
                .send(newCharacter);

            expect(response.statusCode).toEqual(StatusCode.CREATED);

            responseCharacters = await request.get('/characters');
            resultCharacters = responseCharacters.body;

            expect(responseCharacters.statusCode).toEqual(StatusCode.SUCCESS);
            expect(resultCharacters.data.length).toEqual(6);
        });
    });

    describe('PUT /characters', () => {
        it('should return updated character', async () => {
            const characterId = '661318e10b061b35263b93d0';
            let response = await request.get(`/characters/${characterId}`);
            let result = response.body;

            expect(response.statusCode).toEqual(200);
            expect(result.name).toBe('Hero1');

            const newCharacter = {
                name: 'Loro José',
                description: 'O super héroi brasileiro'
            };

            response = await request
                .put(`/characters/${characterId}`)
                .send(newCharacter);
            expect(response.statusCode).toEqual(StatusCode.SUCCESS);

            response = await request.get(`/characters/${characterId}`);
            result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.name).toBe('Loro José');
            expect(result.description).toBe('O super héroi brasileiro');
        });
    });

    describe('DELETE /characters', () => {
        it('should return deleted character', async () => {
            let responseCharacters = await request.get('/characters');
            let resultCharacters = responseCharacters.body;

            expect(resultCharacters.data.length).toEqual(5);
            expect(responseCharacters.statusCode).toEqual(StatusCode.SUCCESS);

            const characterId = '661318e10b061b35263b93d0';
            let response = await request.delete(`/characters/${characterId}`);

            expect(response.statusCode).toEqual(StatusCode.NO_CONTENT);

            responseCharacters = await request.get('/characters');
            resultCharacters = responseCharacters.body;

            expect(resultCharacters.data.length).toEqual(4);
            expect(responseCharacters.statusCode).toEqual(StatusCode.SUCCESS);
        });
    });
});

import supertest from 'supertest';
import { Seed } from '../config/seed';
import { users } from '../user/data.user';
import { closeRedisConnection, deleteCacheRedis } from '../../redisConfig';
import { StatusCode } from '../../src/enums/status.code';
import sinon from 'sinon';
import serie from './series/data-serie.populate';
import comic from './series/data-comic.populate';
import creator from './series/data-creator.populate';
import event from './series/data-event.populate';
import storie from './series/data-storie.populate';
import character from './series/data-character.populate';
import { UrlExternalUtils } from '../../src/utils/url.utils';
import { SerieRepository } from '../../src/repository/serie.repository';
import { Serie } from '../../src/types/serie.types';
import { Comic } from '../../src/types/comic.types';
import { Event } from '../../src/types/event.types';
import { Storie } from '../../src/types/storie.types';
import { Character } from '../../src/types/character.types';

describe('Populates', () => {

    let fetchStub: any;
    let request: any;
    let seed: Seed;

    const serieId = '2063';

    const serieRepository: SerieRepository = new SerieRepository();

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        fetchStub = sinon.stub(global, 'fetch');

        const url: string = UrlExternalUtils.generateFind("series", serieId);
        fetchStub.withArgs(url).resolves({ json: () => Promise.resolve(serie)});
        fetchStub.withArgs(createUrl(serie.data.results[0].creators.collectionURI)).resolves({ json: () => Promise.resolve(creator)});
        fetchStub.withArgs(createUrl(serie.data.results[0].characters.collectionURI)).resolves({ json: () => Promise.resolve(character)});
        fetchStub.withArgs(createUrl(serie.data.results[0].events.collectionURI)).resolves({ json: () => Promise.resolve(event)});
        fetchStub.withArgs(createUrl(serie.data.results[0].stories.collectionURI)).resolves({ json: () => Promise.resolve(storie)});
        fetchStub.withArgs(createUrl(serie.data.results[0].comics.collectionURI)).resolves({ json: () => Promise.resolve(comic)});

        await seed.deleteAllDocuments('users');
        await seed.insertDataDefault(users, 'users');
        await deleteCacheRedis();
    });

    afterEach(async () => {
        fetchStub.restore();
    });

    afterAll(async () => {
        fetchStub.restore();
        await seed.dropDatabase();
        await seed.closeDatabaseConnection();
        await deleteCacheRedis();
        await closeRedisConnection();
    });

    describe('POST /populates/:id', () => {
        it('should populate a database using Series id', async () => {

            const token: string = await getToken('user1', '1234');
            const response = await request.post(`/populates/${serieId}`).set('Authorization', `Bearer ${token}`);
            await new Promise(resolve => setTimeout(resolve, 2000));

            expect(response.status).toEqual(StatusCode.CREATED);

            const series: Serie[] = await serieRepository.findAll();

            expect(series[0].title).toBe('Secret Wars (1984 - 1985)');

            const comics: Comic[] = series[0].comics as Comic[];
            expect(comics.length).toBeGreaterThan(0);

            const events: Event[] = series[0].events as Event[];
            expect(events.length).toBeGreaterThan(0);

            const stories: Storie[] = series[0].stories as Storie[];
            expect(stories.length).toBeGreaterThan(0);

            const characters: Character[] = series[0].characters as Character[];
            expect(characters.length).toBeGreaterThan(0);

        });

    });
    
    async function getToken(user: string, password: string) {

        const response = await request.post(`/users/auth`).send({ username: user, password: password });
        return response.body;
    }

    function createUrl(url: string): string {
        return `${url}${UrlExternalUtils.generateCredentials()}&offset=0&limit=32`;
    }
});

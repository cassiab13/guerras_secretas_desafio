import supertest from 'supertest';
import { Seed } from '../config/seed';
import { users } from './data.user';
import { closeRedisConnection, deleteCacheRedis } from '../../redisConfig';
import { StatusCode } from '../../src/enums/status.code';
import { User } from './../../src/types/user.types';

describe('Users', () => {

    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('users');
        await seed.insertDataDefault(users, 'users');
        await deleteCacheRedis();
    });

    afterAll(async () => {
        await seed.dropDatabase()
        await seed.closeDatabaseConnection();
        await deleteCacheRedis();
        await closeRedisConnection();
    });

    describe('GET /users', () => {
        it('should return users', async () => {

            const response = await request.get('/users');
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.data.length).toEqual(5);
            expect(result.data[1].username).toEqual('user2');
            expect(result.data[3].isAdmin).toBe(false);
        });

        it('should return users filter by email', async () => {

            const response = await request.get('/users?email=user1@gmail.com');
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.data.length).toEqual(1);
            expect(result.data[0].username).toEqual('user1');
        });

        it('should return users project by email and password', async () => {

            const response = await request.get('/users?project=email,password');
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            result.data.forEach((userData: User) => {
                expect(Object.keys(userData)).toEqual(expect.arrayContaining(['email', 'password']));
                expect(Object.keys(userData).length).toEqual(2);
            });
        });

        it('should return users sort by username desc', async () => {

            const response = await request.get('/users?sort=username:desc');
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);

            const size: number = result.data.length - 1; 
            for (let i = 0; i < size; i++) {
                expect(result.data[i].username.localeCompare(result.data[i + 1].username)).toBeGreaterThanOrEqual(0);
            }
        });
        
    });

    describe('GET /users/:id', () => {
        it('should return user by id', async () => {
            
            const userId = '661317e10b061b35263b93d0';
            const response = await request.get(`/users/${userId}`);
            const result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.username).toBe('user1');
            expect(result.email).toBe('user1@gmail.com');
        });

        it('should return Id not found', async () => {

            const userId = '6635a53b2728112a1123c624';
            const response = await request.get(`/users/${userId}`);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(404);
            expect(result.message).toBe("6635a53b2728112a1123c624 not found");
        });
    });

    describe('POST /users', () => {
        it('should return created user normal', async () => {

            let responseUsers = await request.get('/users')
            let resultUsers = responseUsers.body;

            expect(resultUsers.data.length).toEqual(5);

            const token: string = await getToken('user2', '1234');
            const newUser = {
                email: 'jean232@gmail.com',
                username: 'jean1234',
                password: 'teste',
                isAdmin: false
            };

            const response = await request.post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(newUser);

            expect(response.statusCode).toEqual(StatusCode.CREATED);

            responseUsers = await request.get('/users');
            resultUsers = responseUsers.body;

            expect(responseUsers.statusCode).toEqual(StatusCode.SUCCESS);
            expect(resultUsers.data.length).toEqual(6);
        });

        it('should return created user admin', async () => {

            let responseUsers = await request.get('/users')
            let resultUsers = responseUsers.body;

            expect(resultUsers.data.length).toEqual(5);

            const token: string = await getToken('user1', '1234');
            const newUser = {
                email: 'jean232@gmail.com',
                username: 'jean1234',
                password: 'teste',
                isAdmin: true
            };

            const response = await request.post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(newUser);

            expect(response.statusCode).toEqual(StatusCode.CREATED);

            responseUsers = await request.get('/users');
            resultUsers = responseUsers.body;

            expect(responseUsers.statusCode).toEqual(StatusCode.SUCCESS);
            expect(resultUsers.data.length).toEqual(6);
        });

        it('should return token not found when create admin', async () => {

            const newUser = {
                email: 'jean232@gmail.com',
                username: 'jean1234',
                password: 'teste',
                isAdmin: true
            };

            const response = await request.post('/users').send(newUser);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.message).toBe("Token not found");
        });

        it('should return only admins can create admins when create admin', async () => {

            const token: string = await getToken('user2', '1234');
            const newUser = {
                email: 'jean232@gmail.com',
                username: 'jean1234',
                password: 'teste',
                isAdmin: true
            };

            const response = await request.post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(newUser);
            const result = await response.body;
    
            expect(response.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.message).toBe("Somente administradores podem criar novos administradores.");
        });
    });

    describe('POST /auth', () => {
        it('should return user valid', async () => {
            const user = {
                email: 'user1@gmail.com',
                password: '1234'
            };

            const response = await request.post(`/users/auth`).send(user);
            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
        });
    });

    describe('PUT /users', () => {
        it('should return updated user', async () => {

            const userId = '661317e10b061b35263b93d0';
            let response = await request.get(`/users/${userId}`);
            let result = response.body;

            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe('user1');
            expect(result.email).toBe('user1@gmail.com');

            const newUser = {
                username: 'user1234',
                email: 'user1234@gmail.com'
            };

            response = await request.put(`/users/${userId}`).send(newUser);
            expect(response.statusCode).toEqual(StatusCode.SUCCESS);

            response = await request.get(`/users/${userId}`);
            result = response.body;

            expect(response.statusCode).toEqual(StatusCode.SUCCESS);
            expect(result.username).toBe('user1234');
            expect(result.email).toBe('user1234@gmail.com');
        });
    });

    describe('DELETE /users', () => {
        it('should return deleted user', async () => {

            let responseUsers = await request.get('/users');
            let resultUsers = responseUsers.body;

            expect(resultUsers.data.length).toEqual(5);
            expect(responseUsers.statusCode).toEqual(StatusCode.SUCCESS);

            const userId = '661317e10b061b35263b93d4';
            let response = await request.delete(`/users/${userId}`);
            
            expect(response.statusCode).toEqual(StatusCode.NO_CONTENT);

            responseUsers = await request.get('/users');
            resultUsers = responseUsers.body;

            expect(resultUsers.data.length).toEqual(4);
            expect(responseUsers.statusCode).toEqual(StatusCode.SUCCESS);
        });
    });

    async function getToken(user: string, password: string) {
        const response = await request.post(`/users/auth`).send({ username: user, password: password});
        return response.body;
    }

});

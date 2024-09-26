import Redis from 'ioredis';
import { promisify } from 'util';

const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
});

function getRedis(value: string) {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}

function setRedis(key: string, value: string) {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
}

function deleteCacheRedis() {
    const syncRedisDel = promisify(redisClient.flushall).bind(redisClient);
    return syncRedisDel();
}

function closeRedisConnection() {
    const syncRedisDel = promisify(redisClient.quit).bind(redisClient);
    return syncRedisDel();
}

export { redisClient, getRedis, setRedis, deleteCacheRedis, closeRedisConnection };
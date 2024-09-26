import { randomUUID } from 'crypto';

require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME;
const marvel_api = process.env.MARVEL_API || 'http://gateway.marvel.com/v1/public/';
const event = process.env.EVENT || 270;
const ts = process.env.TS || 1;
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;
const privateHash = process.env.PRIVATE_HASH;
const randomName = randomUUID().slice(0, 4);
const dbRandomName = `${randomName}-test`;

const config = {
    dbName,
    dbUrl: `mongodb://${dbHost}:${dbPort}`,
    marvel_api,
    event,
    ts,
    privateKey,
    publicKey,
    privateHash,
    dbRandomName
};

export default config;

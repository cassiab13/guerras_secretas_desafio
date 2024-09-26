import mongoose from 'mongoose';

const creators = [
    {
        _id: new mongoose.Types.ObjectId('551318e10b061b35263b93d0'),
        id: 1,
        firstName: 'Creator1',
        lastName: '1Creator',
        resourceURI: 'resource1',
        thumbnail: {
            path: 'https://hero1.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d2')]
    },
    {
        _id: new mongoose.Types.ObjectId('551318e10b061b35263b93d1'),
        id: 2,
        firstName: 'Creator2',
        lastName: '2Creator',
        resourceURI: 'resource2',
        thumbnail: {
            path: 'https://hero2.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d2')]
    }
];

export { creators };

import mongoose from 'mongoose';

const characters = [
    {
        _id: new mongoose.Types.ObjectId('661318e10b061b35263b93d0'),
        id: 1,
        name: 'Hero1',
        description: 'description',
        resourceURI: 'resource1',
        thumbnail: {
            path: 'https://hero1.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d0')],
        series: [new mongoose.Types.ObjectId('111318e10b061b35263b93d0')]
    },
    {
        _id: new mongoose.Types.ObjectId('661318e10b061b35263b93d1'),
        id: 2,
        name: 'Hero2',
        description: 'description',
        resourceURI: 'resource2',
        thumbnail: {
            path: 'https://hero2.com',
            extension: 'jpg'
        },
        comics: [
            new mongoose.Types.ObjectId('441319e10b061b35263b93d0'),
            new mongoose.Types.ObjectId('441319e10b061b35263b93d1')
        ],
        series: [new mongoose.Types.ObjectId('111318e10b061b35263b93d1')]
    },
    {
        _id: new mongoose.Types.ObjectId('661318e10b061b35263b93d2'),
        id: 3,
        name: 'Hero3',
        description: 'description',
        resourceURI: 'resource3',
        thumbnail: {
            path: 'https://hero3.com',
            extension: 'jpg'
        },
        comics: [
            new mongoose.Types.ObjectId('441319e10b061b35263b93d0'),
            new mongoose.Types.ObjectId('441319e10b061b35263b93d1')
        ],
        series: [new mongoose.Types.ObjectId('111318e10b061b35263b93d3')]
    },
    {
        _id: new mongoose.Types.ObjectId('661318e10b061b35263b93d3'),
        id: 4,
        name: 'Hero4',
        description: 'description',
        resourceURI: 'resource4',
        thumbnail: {
            path: 'https://hero4.com',
            extension: 'jpg'
        },
        comics: [
            new mongoose.Types.ObjectId('441319e10b061b35263b93d0'),
            new mongoose.Types.ObjectId('441319e10b061b35263b93d1')
        ],
        series: [new mongoose.Types.ObjectId('111318e10b061b35263b93d3')]
    },
    {
        _id: new mongoose.Types.ObjectId('661318e10b061b35263b93d4'),
        id: 5,
        name: 'Hero5',
        description: 'description',
        resourceURI: 'resource5',
        thumbnail: {
            path: 'https://hero5.com',
            extension: 'jpg'
        },
        comics: [
            new mongoose.Types.ObjectId('441319e10b061b35263b93d0'),
            new mongoose.Types.ObjectId('441319e10b061b35263b93d1')
        ],
        series: [new mongoose.Types.ObjectId('111318e10b061b35263b93d3')]
    }
];

export { characters };

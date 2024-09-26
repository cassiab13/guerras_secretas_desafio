import mongoose from 'mongoose';

const series = [
    {
        _id: new mongoose.Types.ObjectId('111318e10b061b35263b93d0'),
        id: 1,
        title: 'Serie1',
        resourceURI: 'resource1',
        startYear: 2023,
        thumbnail: {
            path: 'https://hero1.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d2')]
    },
    {
        _id: new mongoose.Types.ObjectId('111318e10b061b35263b93d1'),
        id: 2,
        title: 'Serie2',
        resourceURI: 'resource2',
        startYear: 2023,
        thumbnail: {
            path: 'https://hero2.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d4')]
    },
    {
        _id: new mongoose.Types.ObjectId('111318e10b061b35263b93d2'),
        id: 3,
        title: 'Serie3',
        resourceURI: 'resource3',
        startYear: 2023,
        thumbnail: {
            path: 'https://hero3.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d3')]
    },
    {
        _id: new mongoose.Types.ObjectId('111318e10b061b35263b93d3'),
        id: 4,
        title: 'Serie4',
        resourceURI: 'resource4',
        startYear: 2024,
        thumbnail: {
            path: 'https://hero4.com',
            extension: 'jpg'
        },
        comics: [new mongoose.Types.ObjectId('441319e10b061b35263b93d2')]
    }
];

export { series };

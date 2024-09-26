import mongoose from 'mongoose';

const comics = [
    {
        _id: new mongoose.Types.ObjectId('441319e10b061b35263b93d0'),
        id: 1,
        digitalId: 1,
        title: 'Comic1',
        issueNumber: 1,
        isbn: 1,
        pageCount: 110,
        resourceURI: 'resource1',
        thumbnail: {
            path: 'https://comic1.com',
            extension: 'jpg'
        },
        creators: [
            new mongoose.Types.ObjectId('551318e10b061b35263b93d1'),
            new mongoose.Types.ObjectId('551318e10b061b35263b93d0')
        ],
        characters: [new mongoose.Types.ObjectId('661318e10b061b35263b93d0')]
    },
    {
        _id: new mongoose.Types.ObjectId('441319e10b061b35263b93d1'),
        id: 22,
        digitalId: 22,
        title: 'Comic22',
        issueNumber: 22,
        isbn: 22,
        pageCount: 22220,
        resourceURI: 'resource2',
        thumbnail: {
            path: 'https://comic2.com',
            extension: 'jpg'
        },
        creators: [
            new mongoose.Types.ObjectId('551318e10b061b35263b93d1'),
            new mongoose.Types.ObjectId('551318e10b061b35263b93d0')
        ],
        characters: [new mongoose.Types.ObjectId('661318e10b061b35263b93d1')]
    },
    {
        _id: new mongoose.Types.ObjectId('441319e10b061b35263b93d2'),
        id: 3,
        digitalId: 3,
        title: 'Comic3',
        issueNumber: 3,
        isbn: 3,
        pageCount: 330,
        resourceURI: 'resource3',
        thumbnail: {
            path: 'https://comic3.com',
            extension: 'jpg'
        },
        creators: [
            new mongoose.Types.ObjectId('551318e10b061b35263b93d1'),
            new mongoose.Types.ObjectId('551318e10b061b35263b93d5')
        ],
        characters: [new mongoose.Types.ObjectId('661318e10b061b35263b93d2')]
    },
    {
        _id: new mongoose.Types.ObjectId('441319e10b061b35263b93d3'),
        id: 4,
        digitalId: 4,
        title: 'Comic4',
        issueNumber: 4,
        isbn: 4,
        pageCount: 440,
        resourceURI: 'resource4',
        thumbnail: {
            path: 'https://comic4.com',
            extension: 'jpg'
        },
        creators: [
            new mongoose.Types.ObjectId('551318e10b061b35263b93d3'),
            new mongoose.Types.ObjectId('551318e10b061b35263b93d5')
        ],
        characters: [new mongoose.Types.ObjectId('661318e10b061b35263b93d3')]
    },
    {
        _id: new mongoose.Types.ObjectId('441319e10b061b35263b93d4'),
        id: 5,
        digitalId: 5,
        title: 'Comic5',
        issueNumber: 5,
        isbn: 5,
        pageCount: 550,
        resourceURI: 'resource5',
        thumbnail: {
            path: 'https://comic5.com',
            extension: 'jpg'
        },
        creators: [
            new mongoose.Types.ObjectId('551318e10b061b35263b93d1'),
            new mongoose.Types.ObjectId('551318e10b061b35263b93d0')
        ],
        characters: [new mongoose.Types.ObjectId('661318e10b061b35263b93d4')]
    }
];

export { comics };

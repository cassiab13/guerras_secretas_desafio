import mongoose from 'mongoose';

const users = [
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d0"),
        email: 'user1@gmail.com',
        username: 'user1',
        password: '81dc9bdb52d04dc20036dbd8313ed055',
        isAdmin: true
    },
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d1"),
        email: 'user2@gmail.com',
        username: 'user2',
        password: '81dc9bdb52d04dc20036dbd8313ed055',
        isAdmin: false
    },
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d2"),
        email: 'user3@gmail.com',
        username: 'user3',
        password: '81dc9bdb52d04dc20036dbd8313ed055',
        isAdmin: false
    },
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d3"),
        email: 'user4@gmail.com',
        username: 'user4',
        password: '81dc9bdb52d04dc20036dbd8313ed055',
        isAdmin: false
    },
    {
        _id: new mongoose.Types.ObjectId("661317e10b061b35263b93d4"),
        email: 'user5@gmail.com',
        username: 'user5',
        password: '81dc9bdb52d04dc20036dbd8313ed055',
        isAdmin: false
    }
];

export { users };

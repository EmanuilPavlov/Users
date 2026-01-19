import express from 'express';

const server = express();

// @ts-ignore
server.get('/', (req, res, next) => {
    res.send('Server is running!');
})

export default server;
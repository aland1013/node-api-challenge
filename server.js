const express = require('express');

const projectsRouter = require('./routers/projectsRouter');
const actionsRouter = require('./routers/actionsRouter');

const server = express();

server.use(express.json());
// server.use('/api/projects', projectsRouter);
// server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Node Express Sprint Challenge</h1>`);
});

module.exports = server;

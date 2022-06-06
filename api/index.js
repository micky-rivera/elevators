const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const utils = require('./utils.js');

app.post('/api/calls', (req, res) => {
    const elevators = req.body.elevatorList;
    const call = req.body.call
    const assignment = utils.assignCalls(elevators, call);
    return res.status(201).json(assignment);
});

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports.app = app;
app.listen(process.env.PORT || 8080);

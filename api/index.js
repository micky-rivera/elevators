const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const utils = require('./utils.js');

let calls = [];
let dispatchedCalls = [];

app.post('/api/assignments', (req, res) => {
    if (calls.length > 0) {
        const elevators = req.body;
        const currentCalls = [...calls];
        dispatchedCalls.push(...calls);
        calls = [...calls].filter(call => !dispatchedCalls.includes(call));
        const assignments = utils.assignCalls(elevators, currentCalls);
        return res.status(201).json(assignments);
    }
    return res.status(201).json([]);
});

app.post('/api/calls', (req, res) => {
    calls.push(req.body);
    res.status(201).json(req.body);
});

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports.app = app;
app.listen(process.env.PORT || 8080);

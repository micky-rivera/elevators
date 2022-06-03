const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let calls = [
    {
        origin: 12,
        destination: 2,
        direction: 'up'
    },
    {
        origin: 5,
        destination: 2,
        direction: 'up'
    },
    {
        origin: 2,
        destination: 20,
        direction: 'down'
    },
];

app.post('/api/calls', (req, res) => {
    calls.push(req.body);
    res.status(201).json(calls);
});

app.get('/api/calls', (req, res) => {
    res.json(calls);
    calls = [];
});

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports.app = app;
app.listen(process.env.PORT || 8080);
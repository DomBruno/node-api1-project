// implement your API here
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(403)('Forbidden');
});

server.post('/api/users', (req, res) => {
    res.status(201).json(users);
    });

server.get('/api/users', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  res.status(200).json(hobbits);
});

server.get('api/users/:id', (req, res) => {
    res.status(200).json(users.id);
});

server.delete('api/users/:id', (req, res) => {
    res.status(200);
});

server.put('api/users/:id', (req, res) => {
    res.status(200);
})

server.listen(8000, () => console.log('API running on port 8000'));
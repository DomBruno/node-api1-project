// imports database and express
const db = require('./data/db.js');
const express = require('express');

// create server (not best practices)
const server = express();
server.listen(4000, () => {
  console.log('server listening on port 4000....');
});

// ensures json object is passed to server from req
server.use(express.json());

// Begin Endpoints

// Block root path
server.get('/', (req, res) => {
  res.status(403)('Forbidden');
});

// Add User
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    Users.insert(req.body)
      .then(user => {
        res
        .status(201)
        .json(user);
      })
      .catch(() => {
        res
        .status(500)
        .json({errorMessage: 'There was an error while saving the user to the database',
        });
      });
  }
});

// Fetch User List
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res
      .status(200)
      .json(users);
      })
    .catch(err => {
      res
      .status(500)
      .json({success: false, errorMessage: 'The users information could not be retrieved.'});
    });
    });

server.get('api/users/:id', (req, res) => {
    res.status(200).json(users.id);
});

server.delete('api/users/:id', (req, res) => {
    res.status(200);
});

server.put('api/users/:id', (req, res) => {
    res.status(200);
});
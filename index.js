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
  res
  .status(403)
  .json({success: false, errorMessage: 'Forbidden'});
});

// Add User
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({success: false, errorMessage: 'Please provide name and bio for the user.' });
  } else {
    db.insert(req.body)
      .then(user => {
        res
        .status(201)
        .json(user);
      })
      .catch(() => {
        res
        .status(500)
        .json({success: false, errorMessage: 'There was an error while saving the user to the database',
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

// Fetch User by ID
server.get('api/users/:id', (req, res) => {
  const id = req.params.id;

        if (!id) {
        res
          .status(404)
          .json({success: false, errorMessage: 'The user with the specified ID does not exist.'});
      } else {
        db.findById(id)
        .then(user => {
          res
          .status(200)
          .json({success: true, user})
        .catch(err => {
          res
          .status(500)
          .json({success: false, errorMessage: 'The user information could not be retrieved.'});
        });
        });

// Delete User
server.delete('api/users/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res
      .status(404)
      .json({success: false, errorMessage: 'The user with the specified ID does not exist.'});
  } else {
    db.remove(id)
      res
      .status(204)
      .end();
    }
});

// Edit User
server.put('api/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({success: false, errorMessage: 'Please provide name and bio for the user.' });
  } else {
    db.update(req.params.id, req.body)
      .then(user => {
        if (user) {
        res
        .status(200)
        .json(user);
        } else {
        res
      .status(404)
      .json({success: false, errorMessage: 'The user with the specified ID does not exist.'});
        };
      })
      .catch(err => {
        res
        .status(500)
        .json({success: false, errorMessage: 'The user information could not be modified.'});
      });
    }
})
      }});

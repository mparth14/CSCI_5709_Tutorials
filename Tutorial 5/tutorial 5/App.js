const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data
let users = [
  {
    email: 'abc@abc.ca',
    firstName: 'ABC',
    id: '5abf6783',
  },
  {
    email: 'xyz@xyz.ca',
    firstName: 'XYZ',
    id: '5abf674563',
  },
];

// Middleware
app.use(bodyParser.json());

// GET API to retrieve all users
app.get('/users', (req, res) => {
  res.json({
    message: 'Users retrieved',
    success: true,
    users: users,
  });
});

// PUT API to update user by ID
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;

  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index].email = email || users[index].email;
    users[index].firstName = firstName || users[index].firstName;
    res.json({
      message: 'User updated',
      success: true,
    });
  } else {
    res.status(404).json({
      message: 'User not found',
      success: false,
    });
  }
});

// POST API to add a new user
app.post('/add', (req, res) => {
  const { email, firstName } = req.body;
  const newUser = {
    email,
    firstName,
    id: uuidv4(),
  };
  users.push(newUser);
  res.json({
    message: 'User added',
    success: true,
  });
});

// GET API to retrieve a single user by ID
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json({
      success: true,
      user: user,
    });
  } else {
    res.status(404).json({
      message: 'User not found',
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

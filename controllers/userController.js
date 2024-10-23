const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Sign Up User
function signUpUser(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });

  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Login User
function loginUser(req, res) {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get All Users
function getAllUsers(req, res) {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get Single User
function getUserById(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}
function updateUser(req, res) {
    const { id } = req.params; // Get the ID from the URL
    const updatedData = req.body; // Get the data to update
  
    User.findByIdAndUpdate(id, updatedData, { new: true }) // { new: true } returns the updated document
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  }
  function deleteUser(req, res) {
    const { id } = req.params; // Get the ID from the URL
  
    User.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

module.exports = {
  signUpUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

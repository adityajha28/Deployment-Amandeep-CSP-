// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser');


router.use(bodyParser.json());
// Create a new user
router.post('/users', async (req, res) => {
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        role: req.body.role
    })
    // console.log(req.body);
  try {
    console.log(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch user by role
router.get('/users/:role', async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch user by ID
router.get('/user/:id', getUser, (req, res) => {
  res.json(res.user);
});

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

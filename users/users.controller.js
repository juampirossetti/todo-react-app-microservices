const { validationResult } = require('express-validator/check');
const User = require('./User');
const axios = require('axios');
const env = process.env.NODE_ENV || 'development';

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: 'Fetched users successfully.',
      users: users
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    let newUser = {
      name: req.body.name
    };
    let user = new User(newUser);
    const result = await user.save();
    return res.status(201).json({
      message: 'User created successfully!',
      user: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const name = req.body.name;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Could not find user');
      error.statusCode = 404;
      throw error;
    }
    user.name = name;

    const result = await user.save();
    return res.status(200).json({
      message: 'User updated successfully!',
      user: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }
    if (env !== 'test') {
      await axios.delete('http://localhost:4545/api/todos/user/' + userId);
    }
    await User.findByIdAndRemove(userId);
    return res.status(200).json({ message: 'User deleted.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


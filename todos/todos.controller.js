const { validationResult } = require('express-validator/check');
const Todo = require('./Todo');
const mongoose = require('mongoose');

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find()
    return res.status(200).json({
      message: 'Fetched todos successfully.',
      todos: todos
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTodosByUser = async (req, res, next) => {
  try {
    const todos = await Todo.find({user_id: req.params.userId});
    return res.status(200).json({
      message: 'Fetched todos successfully.',
      todos: todos
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTodosByUser = async (req, res, next) => {
  try {
    //const todos = await Todo.find({user_id: req.params.userId});
    await Todo.deleteMany({user_id : req.params.userId});
    return res.status(200).json({
      message: 'Delete todos successfully.'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    let newTodo = {
        description: req.body.description,
        state: req.body.state,
        user_id: mongoose.Types.ObjectId(req.body.user_id)
    };
    let todo = new Todo(newTodo);
    const result = await todo.save();
    return res.status(201).json({
      message: 'Todo created successfully!',
      todo: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  const todoId = req.params.todoId;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const description = req.body.description;
    const state = req.body.state;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      const error = new Error('Could not find todo');
      error.statusCode = 404;
      throw error;
    }
    todo.description = description;
    todo.state = state;

    const result = await todo.save();
    return res.status(200).json({
      message: 'Todo updated successfully!',
      todo: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      const error = new Error('Could not find todo.');
      error.statusCode = 404;
      throw error;
    }
    await Todo.findByIdAndRemove(todoId);
    return res.status(200).json({ message: 'Todo deleted.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

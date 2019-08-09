const express = require('express');
const { body } = require('express-validator/check');

const todoController = require('./todos.controller');

const router = express.Router();

router.get('/', (req,res,next) =>{
  return res.json({message: "Listening"});
}); //Check function

router.get('/api/todos', todoController.getTodos);

router.get('/api/todos/user/:userId', todoController.getTodosByUser);

router.post('/api/todo',
  body('description')
    .trim()
    .isLength({ min: 3 }),
  body('state')
    .isIn(['todo', 'done']),
  body('user_id')
    .isMongoId(),
  todoController.createTodo
);

router.put(
  '/api/todo/:todoId',
  body('description')
    .trim()
    .isLength({ min: 3 }),
  body('state')
    .isIn(['todo', 'done']),
  body('user_id')
    .isMongoId(),
  todoController.updateTodo
);

router.delete('/api/todos/user/:userId', todoController.deleteTodosByUser);

router.delete('/api/todo/:todoId', todoController.deleteTodo);

module.exports = router;

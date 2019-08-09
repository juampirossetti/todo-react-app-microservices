const express = require('express');
const { body } = require('express-validator/check');

const userController = require('./users.controller');

const router = express.Router();

router.get('/', (req,res,next) =>{
  return res.json({message: "Listening"});
}); //Check function

router.get('/api/users', userController.getUsers);

router.post('/api/user',
  body('name')
    .trim()
    .isLength({ min: 3 }),
  userController.createUser
);

router.put(
  '/api/user/:userId',
  body('name')
    .trim()
    .isLength({ min: 3 }),
  userController.updateUser
);

router.delete('/api/user/:userId', userController.deleteUser);

module.exports = router;

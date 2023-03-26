const express = require('express');
const userRouter = express.Router();
const { getUsers, getSingleUser } = require('../db');

userRouter.get('/:userId', async(req, res, next) => {
  const userId = req.params.userId;
  const output = {
    success: false,
    error: null,
    user: null
  }
  try{
    output.user = await getSingleUser(userId);
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output);
})

userRouter.get('/me', async(req, res, next) => {
  const userId = req.params.userId;
  const output = {
    success: false,
    error: null,
    user: null
  }
  try{
    output.user = await getSingleUser(userId);
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output);
});

userRouter.post('/login', async(req, res, next) => {
  res.send('login placeholder');
});

userRouter.post('/register', async(req, res, next ) => {
  res.send('register placeholder');
});


userRouter.get('/', async(req, res, next) => {
  const output = {
    success: false,
    error: null,
    users: null
  }
  try{
    output.users = await getUsers();
    output.success = true;
  }catch(err){
    output.error = err;
  }
  
  res.send(output);
});

module.exports = userRouter;
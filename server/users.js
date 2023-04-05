const express = require('express');
const userRouter = express.Router();
const { getUsers, createUser, getAndVerifyUserByUsername } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bodyParser = require('body-parser');

userRouter.use(bodyParser.json());

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
  const output = {
    success: false,
    error: null,
    user: null,
    token: null
  }
  try{
    const user = await getAndVerifyUserByUsername(...Object.values(req.body));
    if(!user){
      output.error = "User of that combo does not exist";
    }
    else{
      output.user = user;
      output.success = true;
      const token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET);
      output.token = token
    }    
    res.send(output)
  }catch(err){
    output.error = err;
    res.send(output)
  }
});

userRouter.post('/register', async(req, res, next ) => {
  const output ={
    success: false,
    error: null,
    user: null,
    token: null,
  }
  try{
    const user = await createUser(...Object.values(req.body));
    if(!user){
      output.error = "User Already Exists";
    }
    else{
      output.user = user;
      output.success = true;
      const token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET);
      output.token = token
    }
    
    
    res.send(output)
  }catch(err){
    output.error = err;
    res.send(output)
  }

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
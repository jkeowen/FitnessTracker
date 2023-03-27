const express = require('express');
const userRouter = express.Router();
const { getUsers, getSingleUser, getUserByUsername, createUser } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');

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
  const { username, password } = req.body;
  if(!username || !password){
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username  and password"
    });
  }
  try{
    const user =  await getUserByUsername(username);
    const token = jwt.sign({message: "you're logged in!", "token": `${token}`}, JWT_SECRET)
    if(user && bcrypt(password, user.password)){
      res.send({message: "you're logged in!", "token": `${token}`});
      res.end();
    }else{
      next({
        name:'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  }catch(err){
    console.log(err);
    next(err);
  }
});

userRouter.post('/register', async(req, res, next ) => {
  const {firstName, lastName, username, password, age, weight, emailAddress, isActive} =  req.body;
  try{
    const _user = await getUserByUsername(username);
    if(_user){
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }
    const user = await createUser(...Object.values(req.body));
    const token = jwt.sign({
      id: user.id,
      username
    }, process.env.JWT_SECRET);
    res.send({
      message: "thank you for signing up",
      token
    });
  }catch({name, message}){
    next({name, message})
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
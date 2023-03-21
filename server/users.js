const express = require('express');
const userRouter = express.Router();

userRouter.get('/:username', async(req, res, next) => {
  const username = req.params.username;
  res.send(username);
})

userRouter.get('/me', async(req, res, next) => {
  res.send('user placeholder');
});

userRouter.post('/login', async(req, res, next) => {
  res.send('login placeholder');
});

userRouter.post('/register', async(req, res, next ) => {
  res.send('register placeholder');
});


userRouter.get('/', async(req, res, next) => {
  res.send('all users placeholder');
});

module.exports = userRouter;
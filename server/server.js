const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./users');

apiRouter.use(express.json()); 
apiRouter.use('/users', userRouter);





module.exports = apiRouter;

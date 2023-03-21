const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./users');
const activitiesRouter = require('./activities');

apiRouter.use(express.json()); 
apiRouter.use('/users', userRouter);
apiRouter.use('/activities', activitiesRouter);





module.exports = apiRouter;

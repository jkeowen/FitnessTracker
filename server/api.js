const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./users');
const activitiesRouter = require('./activities');
const routinesRouter = require('./routines');

apiRouter.use(express.json()); 
apiRouter.use('/users', userRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routinesRouter);





module.exports = apiRouter;

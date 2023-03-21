const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./users');
const activitiesRouter = require('./activities');
const routinesRouter = require('./routines');
const personalRecordsRouter = require('./personalRecords');
const exerciseTypeRouter = require('./exerciseType');
const routinesActivitiesRouter = require('./routinesActivities');
const usersActivitiesRouter = require('./usersActivities');

apiRouter.use(express.json()); 
apiRouter.use('/users', userRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routinesRouter);
apiRouter.use('/personalRecords', personalRecordsRouter);
apiRouter.use('/exerciseType', exerciseTypeRouter);
apiRouter.use('/routinesActivities', routinesActivitiesRouter);
apiRouter.use('/usersActivities', usersActivitiesRouter);






module.exports = apiRouter;

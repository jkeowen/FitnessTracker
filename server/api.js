const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./users');
const activitiesRouter = require('./activities');
const routinesRouter = require('./routines');
const personalRecordsRouter = require('./personalRecords');
const exerciseTypeRouter = require('./exerciseType');
const routinesActivitiesRouter = require('./routinesActivities');
const usersActivitiesRouter = require('./usersActivities');
const usersRoutinesRouter = require('./usersRoutines');
const jwt = require('jsonwebtoken');

const  { getSingleUser } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(express.json()); 

apiRouter.use(async(req, res, next)=>{
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if(!auth){
    next();
  }else if(auth.startsWith(prefix)){
    const token = auth.slice(prefix.length);
    try{
      const { id } = jwt.verify(token, JWT_SECRET);
      if(id){
        req.user = await getSingleUser(id);
        next();
      }
    }catch({name, message}){
      next({name, message});
    }
  }else{
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    })
  }
})

apiRouter.use('/users', userRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routinesRouter);
apiRouter.use('/personalRecords', personalRecordsRouter);
apiRouter.use('/exerciseType', exerciseTypeRouter);
apiRouter.use('/routinesActivities', routinesActivitiesRouter);
apiRouter.use('/usersActivities', usersActivitiesRouter);
apiRouter.use('/usersRoutines', usersRoutinesRouter);






module.exports = apiRouter;

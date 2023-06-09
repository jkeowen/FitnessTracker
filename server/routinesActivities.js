const express = require('express');
const routinesActivitiesRouter = express.Router();
const { assignActivityToRoutine } = require('../db');

routinesActivitiesRouter.post('/', async(req, res, next) => {
  const output = {
    success: false,
    error: null,
    relation: null
  }
  console.log(req.body)
  try{
    output.relation = await assignActivityToRoutine(...Object.values(req.body));
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output);
});



module.exports = routinesActivitiesRouter;
const express = require('express');
const usersRoutinesRouter = express.Router();
const { addRoutineToUser } = require('../db');

usersRoutinesRouter.post('/', async(req, res, next)=>{
  const output = {
    success: false,
    error: null,
    relation: null
  }

  try{
    output.relation = await addRoutineToUser(...Object.values(req.body));
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output);
})

module.exports = usersRoutinesRouter;
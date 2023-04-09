const express = require('express');
require('dotenv').config();

const { getRoutines,
        createRoutine,
        updateRoutine,
        deleteRoutine } = require('../db');
const routinesRouter = express.Router();

routinesRouter.get('/', async(req, res, next) => {
  console.log('hit')
  const output ={
    success: false,
    error: null,
    routines: null
  }

  try{
    output.routines = await getRoutines()
    output.success = true;
  }catch(err){
    output.error = err
  }
  res.send(output);

});

routinesRouter.post('/', async(req, res, next) => {
  const output ={
    success: false,
    error: null,
    routine: null
  }
  try{
   console.log(req.body)
    output.routine = await createRoutine(...Object.values(req.body))
    output.success = true
  }catch(err){
    output.error = err;
  }
  
  res.send(output)
});

routinesRouter.patch('/:routineId', async(req, res, next) => {
  const routineId = req.params.routineId;
  const output = {
    success: false,
    error: null,
    routine: null
  }
  try{
    output.routine = await updateRoutine(routineId, req.body);
    output.success = true;

  }catch(err){
    output.error = err;
  }
  res.send(output)
});

routinesRouter.delete('/:routineId', async(req, res, next) => {
  const routineId = req.params.routineId;
  const output = {
    success: false,
    error: null,
    routine: null
  }

try{
  output.routine = await deleteRoutine(routineId);
  output.success = true;
}catch(err){
  output.error = true;
}
  res.send(output)
});


routinesRouter.post('/:routineId/activities', async(req, res, next) => {
  const routineId = req.params.routineId;
  res.send(routineId);
})

module.exports = routinesRouter;
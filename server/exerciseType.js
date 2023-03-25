const express = require('express'); 
const exerciseTypeRouter = express.Router();
const { getExerciseType, getSingleExerciseType } = require('../db');

exerciseTypeRouter.get('/', async(req, res, next) => {
  const output = {
    success: false,
    error: null,
    types: null,
  }
  try{
    output.types = await getExerciseType();
    output.success = true;
  }catch (err) {
    output.error = err
  }
  res.send(output)
});

exerciseTypeRouter.get('/:typeId', async(req, res, next) => {
  const typeId = req.params.typeId;
  const output = {
    success: false,
    error: null, 
    type: null,
  }
  console.log(typeId)
  try{
    output.type = await getSingleExerciseType(typeId);
    output.success = true;
  }catch(err){
    output.error = err
  }
  res.send(output)
});

module.exports = exerciseTypeRouter;
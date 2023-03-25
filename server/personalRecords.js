const express = require('express');
const { getPersonalRecords, getRecordsByActivity, getSingleUserRecords, addPersonalRecord } = require('../db');
const personalRecordsRouter = express.Router();


personalRecordsRouter.get('/', async(req, res, next)=>{
  const output = {
    success: false,
    error: null,
    records: null
  }
  try{
    output.records = await getPersonalRecords();
    output.success = true
  }catch(err){
    output.error = err;
  }
  res.send(output);
})

personalRecordsRouter.get('/:activityId', async(req, res, next) => {
  const activityId = req.params.activityId;
  const output = {
    success: false,
    error: null,
    records: null
  }

  try{
    output.records = await getRecordsByActivity(activityId)
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output)
});

personalRecordsRouter.get('/users/:userId', async(req, res, next) => {
  const userId = req.params.userId;
  const output = {
    success: false,
    error: null,
    record: null
  }
  try{
    output.record = await getSingleUserRecords(userId);
    output.success = true
  }catch(err){
    output.error = err;
  }

  res.send(output);
});

personalRecordsRouter.post('/', async(req, res, next)=>{
  const output = {
    success: false,
    error: null,
    records: null
  }
  const { userId, activityId, record } = req.body;
  try{
    output.records = await addPersonalRecord(userId, activityId, record);
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output);
})





module.exports = personalRecordsRouter;
const express = require('express');
const usersActvitiesRouter = express.Router();
const { addActivitiyToUser } = require('../db');

usersActvitiesRouter.post('/', async(req, res, next) => {
  const output = {
    success: false,
    error: null,
    relation: null
  }
  try{
    output.relation = await addActivitiyToUser(...Object.values(req.body));
    output.success = true;
  }catch(err){
    output.error = err;
  }
  res.send(output);
});


module.exports = usersActvitiesRouter;
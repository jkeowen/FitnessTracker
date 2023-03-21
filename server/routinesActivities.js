const express = require('express');
const routinesActivitiesRouter = express.Router();

routinesActivitiesRouter.post('/', async(req, res, next) => {
  res.send('post new relation placeholder');
});

routinesActivitiesRouter.delete('/:routinesActivitiesId', async(req, res, next) => {
  const routinesActivitiesId = req.params.routinesActivitiesId;
  res.send(routinesActivitiesId);
});

module.exports = routinesActivitiesRouter;
const express = require('express'); 
const exerciseTypeRouter = express.Router();

exerciseTypeRouter.get('/', async(req, res, next) => {
  res.send('get exercise type placeholder');
});

exerciseTypeRouter.get('/typeId', async(req, res, next) => {
  const typeId = req.params.typeId;
  res.send(typeId);
});

module.exports = exerciseTypeRouter;
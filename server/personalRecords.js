const express = require('express');
const personalRecordsRouter = express.Router();

personalRecordsRouter.get('/', async(req, res, next) => {
  res.send('get all personal records placeholder')
});

personalRecordsRouter.get('/:userId', async(req, res, next) => {
  const userId = req.params.userId;
  res.send(userId);
});

personalRecordsRouter.patch('/:userId', async(req, res, next) => {
  const userId = req.params.userId;
  res.send(userId);
});

personalRecordsRouter.delete('/:userId', async(req, res, next) => {
  const userId = req.params.userId;
  res.send(userId);
});

module.exports = personalRecordsRouter;
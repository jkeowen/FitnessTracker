const express = require('express');
const usersActvitiesRouter = express.Router();

usersActvitiesRouter.post('/', async(req, res, next) => {
  res.send('new relation placeholder');
});

usersActvitiesRouter.delete('/:id', async(req, res, send) => {
  const id = req.params.id;
  res.send(`delete relation placeholder ${id}`);
});

module.exports = usersActvitiesRouter;
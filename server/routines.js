const express = require('express');
const routinesRouter = express.Router();

routinesRouter.get('/', async(req, res, next) => {
  res.send('get routines placeholder')
});

routinesRouter.post('/', async(req, res, next) => {
  res.send('post new routine')
});

routinesRouter.patch('/:routineId', async(req, res, next) => {
  const routineId = req.params.routineId;
  res.send(`editing a routine at ${routineId}`)
});

routinesRouter.delete('/:routineId', async(req, res, next) => {
  const routineId = req.params.routineId;
  res.send(`delete ${routineId}`)
});

routinesRouter.get('/:username', async(req, res, next) => {
  const username = req.params.username;
  res.send(username)
});

routinesRouter.post('/:routineId/activities', async(req, res, next) => {
  const routineId = req.params.routineId;
  res.send(routineId);
})

module.exports = routinesRouter;
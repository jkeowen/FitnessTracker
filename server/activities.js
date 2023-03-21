const express = require('express');
const activitiesRouter = express.Router();

activitiesRouter.get('/', async(req, res, next) =>{
    res.send('Get activities placeholder');
});

activitiesRouter.post('/', async(req, res, next)=>{
    res.send('Post activities placeholder');
});

activitiesRouter.patch('/:activityId', async(req, res, next)=>{
    const activityId = req.params.activityId;
    res.send(`Edit activity ${activityId}`);
});

activitiesRouter.get('/:activityId', async(req, res, next)=>{
    const activity_id = req.params.activityId;
    res.send(`New activity placeholder ${activity_id}`);
})

activitiesRouter.get('/:activityId/routines', async(req, res, next)=>{
    const activity_id = req.params.activityId;
    res.send(`Routines of activityId ${activity_id} placeholder`);
});

module.exports = activitiesRouter;


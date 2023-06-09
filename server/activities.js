const express = require('express');
const activitiesRouter = express.Router();
const { getActivities, 
				getSingleActivity, 
				createActivity
			} = require('../db');

activitiesRouter.get('/', async(req, res, next) =>{
	const output = {success: false,
									error: null, 
									activities: null
									}
	try{
		const activities = await getActivities();
		output.success = true;
		output.activities = activities
	}catch(err){
			output.error = err;
	}
	res.send(output);
});

activitiesRouter.post('/', async(req, res, next)=>{
	const output = {
		success: false,
		error: null,
		newActivity: null

	}
	console.log(req.body)
	try{
	const newActivity = await createActivity(...Object.values(req.body));
	output.success = true;
	output.newActivity = newActivity;
	}catch(err){
		output.error = err;
	}
	res.send(output);
});

activitiesRouter.get('/:activityId', async(req, res, next)=>{
	const activity_id = req.params.activityId;
	const output = {success: false,
									error: null, 
									activity: null
								 }
	try{
		const activity = await getSingleActivity(activity_id);
		if(!activity){
			output.error = "Invalid Id";
		}else{
		output.success = true;
		output.activity = activity}
	}catch(err){
		next(err)
	}
	res.send(output);
})



module.exports = activitiesRouter;


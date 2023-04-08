const client = require('./client');

const assignActivityToRoutine = async(routine_id, activity_id, count) => {
	try{
	const { rows :[ assignemnt ] } = await client.query(`
			INSERT INTO routines_activities(id_routines, id_activities, count)
			VALUES($1, $2, $3)
			RETURNING *;
	`, [routine_id, activity_id, count]);
			return assignemnt
	}catch(err){
			throw err;
	}
};

module.exports = {
  assignActivityToRoutine,
  
}
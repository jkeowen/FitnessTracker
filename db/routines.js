const client = require('./client');

const createRoutine = async(creator_id, name, description, typeId, isPublic, isActive)=>{
	try{
	const { rows : [ routine ]} = await client.query(
			`
					INSERT INTO routines(creator_id, name, description, type_id, is_public, is_active)
					VALUES($1, $2, $3, $4, $5, $6)
					RETURNING *;
			`, [creator_id, name, description, typeId, isPublic, isActive]);    
			return routine
	}catch(err){
			throw err;
	}
};

const getRoutines = async() => {
	try{
		const { rows: routines } = await client.query(`
			SELECT * FROM routines;
		`)
		const { rows: relations } = await client.query(`
			SELECT id_routines, activities.name
			FROM routines_activities
			JOIN activities 
			ON routines_activities.id_activities = activities.id; 
		`);

		routines.forEach((routine)=>{
			routine.activities = []
			for(let i = 0; i < relations.length; i++){
				if(relations[i].id_routines === routine.id){
					routine.activities.push(relations[i].name);
				}
			}
		} )

		return routines;
	}catch(err){
		throw err;
	}	
};

const getSingleRoutine = async( routineId ) =>{
	try{
		const { rows: [ routine ] } = await client.query(`
			SELECT * FROM routines 
			WHERE routines.id = $1;	
		`, [routineId]);
		const { rows: relations } = await client.query(`
			SELECT activities.name
			FROM routines_activities
			JOIN activities 
			ON routines_activities.id_activities = activities.id
			WHERE routines_activities.id_routines = $1;
		`, [routineId]);
		routine.activities = relations.map((relation)=> relation.name);
		return routine			
	}catch(err){
		throw err;
	}
};

const deleteRoutine = async( routineId ) => {
	try {
		const { rows: [ removed ]} = await client.query(`
		UPDATE routines 
		SET is_active = false
		WHERE id = $1
		RETURNING *;
		`, [routineId]);
		return removed
	} catch (err) {
		throw err;
	}
}

const makePrivateRoutine = async ( routineId ) => {
	try {
		const { rows : [ private ]} = await client.query(`
		UPDATE routines 
		SET is_public = false
		WHERE id = $1
		RETURNING *;
		`, [routineId]);
		return private
	} catch (err) {
		throw err;
	}
}

const updateRoutine = async ( routineId, fields = {}) => {
	const setString = Object.keys(fields).map((key, index) => `${key}=$${index + 2}`).join(', ');
	try{
		const { rows : [ updated ]} = await client.query(`
		UPDATE routines 
		SET ${setString} 
		WHERE id = $1
		RETURNING *;
		`, [routineId, ...Object.values(fields)])
		return updated
	}catch (err) {
		throw err; 
	}
}

module.exports = {
  createRoutine,
  getRoutines,
  getSingleRoutine,
	deleteRoutine,
	makePrivateRoutine,
	updateRoutine
}
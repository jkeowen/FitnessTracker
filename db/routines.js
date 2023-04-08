const client = require('./client');
const { getUsernames } = require('./users');

const createRoutine = async(creator_id, name, description, typeId, isPublic, isActive)=>{
	try{
	const { rows : [ routine ]} = await client.query(
			`
				INSERT INTO routines(creator_id, name, description, type_id, is_public, is_active)
				VALUES($1, $2, $3, $4, $5, $6)
				RETURNING *;
			`, [creator_id, name, description, typeId, isPublic, isActive]);    
		const {rows: [ typeData ] } = await client.query(`
			SELECT name, icon 
			FROM exercise_type
			WHERE exercise_type.id = $1;
		`, [typeId]);
			routine.type = typeData.name;
			routine.icon = typeData.icon; 
			routine.activities = [];
			delete routine.type_id
			return routine
	}catch(err){
			throw err;
	}
};

const getRoutines = async() => {
	try{
		const { rows: routines } = await client.query(`
			SELECT routines.id, creator_id, routines.name, description,
				exercise_type.name as type, exercise_type.icon as icon,
				is_public, is_active
			FROM routines
			JOIN exercise_type
			ON routines.type_id = exercise_type.id;
		`)
		const { rows: relations } = await client.query(`
			SELECT id_routines, activities.name, count
			FROM routines_activities
			JOIN activities 
			ON routines_activities.id_activities = activities.id; 
		`);
			const usernames  = await getUsernames();
		routines.forEach((routine)=>{
			routine.creator = null;
			if(routine.creator_id > 0){
				routine.creator = usernames[routine.creator_id -1 ].username;
			}

			routine.activities = []
			for(let i = 0; i < relations.length; i++){
				if(relations[i].id_routines === routine.id){
					const activity = relations[i].name;
					const count = relations[i].count;
					const medObject = {}
					medObject[activity] = count
					routine.activities.push(medObject);
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
const client = require('./client')

const {
	createUser, 
	createActivity, 
	createRoutine,
	createExerciseType, 
	assignActivityToRoutine, 
	addPersonalRecord,
	addActivityToUser,
	getActivities, 
	getSingleActivity, 
	getPersonalRecords, 
	getSingleUserRecords,
	getRecordsByActivity,
	getExerciseType,
	getSingleExerciseType,
	getUsers,
	getUserByUsername,
	getRoutines, 
	getSingleRoutine, 
	addRoutineToUser,
	deleteRoutine,
	makePrivateRoutine,
	updateRoutine,
	editUser


} = require('.');

const dropTables = async() =>{
	await client.query(`
		DROP TABLE IF EXISTS users_activities;
		DROP TABLE IF EXISTS users_routines;
		DROP TABLE IF EXISTS personal_records;
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTS routines_activities;
		DROP TABLE IF EXISTS activities;
		DROP TABLE IF EXISTS routines;
		DROP TABLE IF EXISTS exercise_type;
	`)
};

const buildTables = async() =>{
	await client.query(`
	CREATE TABLE users( id SERIAL PRIMARY KEY,
											first_name VARCHAR(25) NOT NULL,
											last_name VARCHAR(25) NOT NULL,
											username VARCHAR(25) UNIQUE NOT NULL,
											password VARCHAR(110) UNIQUE NOT NULL,
											age INTEGER NOT NULL,
											weight INTEGER NOT NULL,
											email_address VARCHAR(25) NOT NULL,
											is_active BOOLEAN DEFAULT TRUE);
	CREATE TABLE exercise_type( id SERIAL PRIMARY KEY,
															name VARCHAR(25) NOT NULL UNIQUE,
															icon VARCHAR(25));
	CREATE TABLE routines( id SERIAL PRIMARY KEY,
													creator_id INTEGER DEFAULT '0',
													name VARCHAR(25),
													description TEXT NOT NULL,
													type_id INTEGER REFERENCES exercise_type(id),
													is_public BOOLEAN DEFAULT 'true',
													is_active BOOLEAN DEFAULT 'true');
	CREATE TABLE activities( id SERIAL PRIMARY KEY,
															name VARCHAR(25) UNIQUE NOT NULL,
															instructions TEXT NOT NULL,
															reps VARCHAR(8) NOT NULL,
															sets VARCHAR(8) NOT NULL,
															equipment VARCHAR(25) NOT NULL,
															type_id INTEGER REFERENCES exercise_type(id),
															description TEXT NOT NULL);
	CREATE TABLE routines_activities(id_routines INTEGER REFERENCES routines(id),
																			id_activities INTEGER REFERENCES activities(id));
	CREATE TABLE personal_records(id SERIAL PRIMARY KEY, 
															user_id INTEGER REFERENCES users(id),
															activity_id INTEGER REFERENCES activities(id),
															record VARCHAR(10) 
															);
	CREATE TABLE users_activities(user_id INTEGER REFERENCES users(id),
																	activity_id INTEGER REFERENCES activities(id));
	CREATE TABLE users_routines(user_id INTEGER REFERENCES users(id),
																	routine_id INTEGER REFERENCES routines(id));
	`)
	}

const rebuildTables = async() =>{
	console.log("DROPPING TABLES");
	await dropTables();
	console.log('FINISHED DROPPING TABLES');
	console.log('BUILDING TABLES');
	await buildTables();
	console.log('FINISHED BUILDING TABLES')
};

const createUsers = async() =>{
	console.log('CREATING USERS');
	await createUser('Pubs', 'Studly', 'heavyLifter25', 'Lift4Gains4Lyf', '32', '180', 'pStuds@exerciz.com', true);
	await createUser('Flash', 'McSpeedy', 'quikboi222', 'ILUVRUNNING', '25', '110', 'speedz@exerciz.com', true);
	await createUser('Cassandra', 'Zen', 'manifestYourDestiny9', 'EARTHmother', '22', '100', 'yogamomma@exerciz', true);
	await createUser('Arnold', 'Flagstaff', 'ironBelly3', 'bunniesandkitties2!', '45', '220', 'DMMECATPICS@exerciz', true)
	console.log('FINISHED CREATING USERS');
};

const createActivities = async() =>{
	console.log('CREATING ACTIVITIES')
	await createActivity('Bench Press', 'LIFT THE IRON PLACEHOLDER', 10, 5, 'Bench, Barbell', 2, 'Uhh its a bench press');
	await createActivity('Sprints', 'Run fast for a short distance', 5, 5, 'Track, feet', 1, 'Run real fast, be explosive, focus on technique');
	await createActivity('Holding head underwater', 'See how long you can survive without oxygen', 40, 5, 'head, water bucket', 3, 'Try not to suffocate!');
	await createActivity('Yoga', 'Bendy bend', 1, 1, 'yoga mat', 4, 'bend and stuff');
	await createActivity('Squats', 'Squat with bar and plates', 5, 5, 'bar and plates', 2, 'its a squat')
	console.log('FINISHED CREATING ACTIVITIES')
};

const createExerciseTypes = async() =>{
	console.log("CREATING EXERCISE TYPES");
	await createExerciseType('ZipZap', 'heart-pulse');
	await createExerciseType('Pumping Iron', 'dumbbell');
	await createExerciseType('Grit', "person-harassing");
	await createExerciseType('Mind/Body', 'hands-holding-circle')
	console.log("FINISHED CREATING EXERCISE TYPES");
}

const createRoutines = async() =>{
	console.log('CREATING ROUTINES');
	await createRoutine(0, 'GET RIPPED', "LIFT SOME HEAVY STUFF", 2, true, true);
	await createRoutine(0, 'SUPER CARDIO EXTREME', 'THIS WILL MAKE YOUR GD HEART EXPLODE', 1, true, true);
	await createRoutine(0, 'True Grit', 'True not to die', 3, true, true);
	await createRoutine(0, 'Transcendence', 'Transcend This Earthly Plane', 4, true, true);
	console.log('FINISHED CREATING ROUTINES');
}

const assignActivityToRoutines = async() =>{
	console.log("ASSIGNING ACTIVITIES TO ROUTINES");
	await assignActivityToRoutine(1,1);
	await assignActivityToRoutine(2,2);
	await assignActivityToRoutine(3,3);
	await assignActivityToRoutine(4,4)
	await assignActivityToRoutine(1,5)
	console.log('FINISHED ASSIGNING ACTIVITIES TO ROUTINES');
}

const addPersonalRecords = async()=>{
	console.log('ASSIGNING RECORDS');
	await addPersonalRecord(1, 1, '315');
	await addPersonalRecord(1,2,'13s')
	await addPersonalRecord(2, 2, '8s');
	await addPersonalRecord(3, 3, '3m')
	console.log('FINISHED ASSIGNING RECORDS');
};

const addActivityToUsers = async()=>{
	console.log("ASSIGNING ACTIVITIES TO USERS");
	await addActivityToUser(1,1);
	await addActivityToUser(1,2);
	await addActivityToUser(2,2);
	await addActivityToUser(3,3);
	await addActivityToUser(4,4);
	console.log("FINISHED ASSIGNING ACTIVITIES TO USERS")
}

const addRoutinesToUsers = async() => {
	console.log("ASSIGNING ROUTINES TO USERS");
	await addRoutineToUser(1,1);
	await addRoutineToUser(1,2);
	await addRoutineToUser(2,2);
	await addRoutineToUser(3,3);
	await addRoutineToUser(4,4);
	console.log("FINISHED ASSIGNING ROUTINES TO USERS");
}

const testDb = async()=>{
	console.log('CONNECTING TO DB');
	client.connect();
	console.log("FINISHED CONNECTING");
	await rebuildTables();
	await createUsers();
	await createExerciseTypes();
	await createActivities();
	await createRoutines();
	await assignActivityToRoutines();
	await addPersonalRecords();
	await addActivityToUsers();
	await addRoutinesToUsers();
	console.log('DISCONNECTING FROM DB');
	client.end();
	console.log('FINISHED DISCONNECTING FROM DB');
}

testDb();
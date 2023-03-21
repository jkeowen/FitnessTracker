const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/fitness_tracker-dev');

const createUser = async(firstName, lastName, username, password, age, weight, emailAddress, isActive) =>{

    const { rows: [ user ] } = await client.query(`
        INSERT INTO users(first_name, last_name, username, password, age, weight, email_address, is_active)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `, [firstName, lastName, username, password, age, weight, emailAddress, isActive]);
    return user;
};

const createActivity = async(name, instructions, reps, sets, equipment, type_id, descritpion) =>{
    const { rows: [ activity ] } = await client.query(`
        INSERT INTO activities(name, instructions, reps, sets, equipment, type_id, description)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `, [name, instructions, reps, sets, equipment, type_id, descritpion]);
    return activity;
};

const createRoutine = async(creator_id, name, descritpion, typeId, isPublic, isActive)=>{
    const { rows : [ routine ]} = await client.query(
        `
            INSERT INTO routines(creator_id, name, description, type_id, is_public, is_active)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [creator_id, name, descritpion, typeId, isPublic, isActive]);

        return routine
};

const createExerciseType = async(name) =>{
    const { rows : [ type ]} = await client.query(`
        INSERT INTO exercise_type(name)
        VALUES($1)
        RETURNING *;
    `, [name])
    return type;
}

const assignActivityToRoutine = async(routine_id, activity_id) => {
    const { rows :[ assignemnt ] } = await client.query(`
        INSERT INTO routines_activities(id_routines, id_activities)
        VALUES($1, $2)
        RETURNING *;
    `, [routine_id, activity_id]);
    return assignemnt;
};

const addPersonalRecord = async(userId, activityId, record) =>{
    try{
        const { rows : [ personalRecord ] } = await client.query(`
            INSERT INTO personal_records(user_id, activity_id, record)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [userId, activityId, record])
        return personalRecord;
    }catch(err){
        throw err;
    }
};

const addActivityToUser = async(userId, activityId) =>{
    try{
        const { rows : [ assignment ] } = await client.query(`
            INSERT INTO users_activities(user_id, activity_id)
            VALUES($1,$2)
            RETURNING*;
        `, [userId, activityId]);
        return assignment;
    }catch(err){
        throw err;
    }
}


module.exports={
    client,
    createUser,
    createActivity, 
    createRoutine,
    createExerciseType,
    assignActivityToRoutine,
    addPersonalRecord, 
    addActivityToUser
}
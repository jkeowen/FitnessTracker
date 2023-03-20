const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/fitness_tracker-dev');

const createUser = async(firstName, lastName, username, password, age, weight, emailAddress) =>{

    const { rows: [ user ] } = await client.query(`
        INSERT INTO users(first_name, last_name, username, password, age, weight, email_address)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `, [firstName, lastName, username, password, age, weight, emailAddress]);
    return user;
};

const createActivity = async(name, instructions, reps, sets, equipment, descritpion) =>{
    const { rows: [ activity ] } = await client.query(`
        INSERT INTO activities(name, instructions, reps, sets, equipment, description)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `, [name, instructions, reps, sets, equipment, descritpion]);
    return activity;
}

module.exports={
    client,
    createUser,
    createActivity
}
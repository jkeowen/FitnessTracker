const {
    client, 
    createUser, 
    createActivity
} = require('./db');

const dropTables = async() =>{
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS activities;
    `)
};

const buildTables = async() =>{
    await client.query(`
        CREATE TABLE users( id SERIAL PRIMARY KEY,
                            first_name VARCHAR(25) NOT NULL,
                            last_name VARCHAR(25) NOT NULL,
                            username VARCHAR(25) UNIQUE NOT NULL,
                            password VARCHAR(25) UNIQUE NOT NULL,
                            age INT NOT NULL,
                            weight INT NOT NULL,
                            email_address VARCHAR(25) NOT NULL);
        CREATE TABLE activities( id SERIAL PRIMARY KEY,
                                 name VARCHAR(25) UNIQUE NOT NULL,
                                 instructions TEXT NOT NULL,
                                 reps INT NOT NULL,
                                 sets INT NOT NULL,
                                 equipment VARCHAR(25) NOT NULL,
                                 description TEXT NOT NULL);
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
    await createUser('Pubs', 'Studly', 'heavyLifter25', 'Lift4Gains4Lyf', '32', '180', 'pStuds@exerciz.com')
    console.log('FINISHED CREATING USERS');
}

const createActivities = async() =>{
    console.log('CREATING ACTIVITIES')
    await createActivity('Bench Press', 'LIFT THE IRON PLACEHOLDER', '10', '5', 'Bench, Barbell', 'Uhh its a bench press' )
    console.log('FINISHED CREATING ACTIVITIES')

}

const testDb = async()=>{
    console.log('CONNECTING TO DB');
    client.connect();
    console.log("FINISHED CONNECTING");
    await rebuildTables();
    await createUsers();
    await createActivities();
    console.log('DISCONNECTING FROM DB');
    client.end();
    console.log('FINISHED DISCONNECTING FROM DB');
}

testDb();
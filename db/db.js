const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/fitness_tracker-dev');

console.log('CONNECTING TO DB')
client.connect();
console.log('FINISHED CONNECTING')
console.log('DISCONNECTING')
client.end();
console.log('FINISHED DICONNECTING')
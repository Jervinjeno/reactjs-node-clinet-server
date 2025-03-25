// filepath: /Users/ashlinejervin/Desktop/Devops Learning/Source Code/reactjs-node-clinet-server/server/db.js
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Connection error', err.stack));

module.exports = pool;
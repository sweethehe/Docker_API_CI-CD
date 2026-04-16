const { Pool } = require('pg');
const { createClient } = require('redis');

// --------- CONNEXION POSTGRESQL ---------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// --------- CONNEXION REDIS ---------
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redis.on('error', (err) => console.log('Redis Client Error', err));

redis.connect().catch(console.error);

module.exports = { pool, redis };

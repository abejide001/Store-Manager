import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
  /* eslint-disable no-console */
  console.log('connected to db');
});
export default pool;

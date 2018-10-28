import { Pool } from 'pg';
import dotenv from 'dotenv';


if (process.env && process.env.NODE_ENV) {
  dotenv.config({path: '.env.' + process.env.NODE_ENV});
} else {
  dotenv.config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
  /* eslint-disable no-console */
  console.log('connected to db: '+process.env.DATABASE_URL);
});
export default pool;

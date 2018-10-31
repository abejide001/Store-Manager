import pool from '../../db-config/database_connection';
import Helper from '../helper/hashToken';

const password = Helper.hashPassword('abcde');

const seedUser = async () => {
  const seed = `INSERT INTO
  users(email, password, fullname, username, role)
  VALUES($1, $2, $3, $4, $5)
  returning *`;
  const values = [
    'abejidefemi1@gmail.com',
    password,
    'abejide femi',
    'babane',
    'admin',
  ];
  await pool.query(seed, values);
};
seedUser();

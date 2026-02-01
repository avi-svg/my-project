const postgres = require('../config/postgres');


const getUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password
    FROM users
    WHERE email = $1
  `;

  const { rows } = await postgres.query(query, [email]);
  return rows[0];
};


const createUser = async (email, hashedPassword) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email
  `;

  const { rows } = await postgres.query(query, [email, hashedPassword]);
  return rows[0];
};


const getUserById = async (id) => {
  const query = `
    SELECT id, email
    FROM users
    WHERE id = $1
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
};

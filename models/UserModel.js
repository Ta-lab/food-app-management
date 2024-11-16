const db = require('../config/db');

exports.createUser = async (userData) => {
  console.log("userData",userData)
  const sql = `INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)`;
  return db.execute(sql, [userData.username, userData.email, userData.password, userData.role]);
};

exports.getUserByEmail = async (email) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};

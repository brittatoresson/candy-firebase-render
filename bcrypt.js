const bcrypt = require("bcryptjs");
const salt = 10;

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const hashedPassword = await bcrypt.compare(password, hash);
  return hashedPassword;
}

module.exports = { hashPassword, comparePassword };

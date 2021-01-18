const db = require('../models');

async function getUser(loginID) {
  const user = await db.users.findOne({ attributes: ['email', 'name'] }, { where: loginID });
  return user;
}

module.exports.getUser = getUser;

const jwt = require('jsonwebtoken');

function setToken(user, secretkey) {
  const userInfo = { eamil: user.email };
  const options = { expiresIn: '7d', issuer: 'todaymovie.net', subject: 'userInfo' };

  return jwt.sign(userInfo, secretkey, options);
}

module.exports = setToken;

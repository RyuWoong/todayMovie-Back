const jwt = require('jsonwebtoken');

function setToken(user) {
  const userInfo = { eamil: user.email, name: user.name };
  const secretkey = 'todaymovie';
  const options = { expiresIn: '7d', issuer: 'todaymovie.net', subject: 'userInfo' };

  return jwt.sign(userInfo, secretkey, options);
}

module.exports = setToken;

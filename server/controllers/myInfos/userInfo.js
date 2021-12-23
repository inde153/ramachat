const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { decrypt } = require('../users/crypto');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.headers.authorization);

  const { userId, email } = accessTokenData;

  console.log(userId, email);
  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }
  Users.findOne({
    where: {
      userId,
    },
  }).then((data) => {
    delete data.dataValues.password;
    const userInfo = {
      userId: data.dataValues.userId,
      email: data.dataValues.email,
    };

    return res.status(200).json({ data: { userInfo: userInfo }, message: 'ok' });
  });
};

const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { checkAuthorization } = require('../tokenFunctions');

module.exports = (req, res) => {
  if (!checkAuthorization(req)) {
    res.status(401).send('unauthorized user');
    return;
  }

<<<<<<< HEAD
  console.log('authorization', req.headers.authorization);
=======
>>>>>>> 5c1c2edae42265fbad04f9ec63fb5ec10f4273b3
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: 'not authorized' });
  }
  const { userId } = accessTokenData;
  Users.findOne({
    where: {
      userId,
    },
  }).then((data) => {
    if (data) {
      delete data.dataValues.password;
      return res.json({ data: { userInfo: data.dataValues }, message: 'ok' });
    }
  });
};

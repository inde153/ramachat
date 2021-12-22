const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('../../models').sequelize;

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  console.log(accessTokenData);
  const id = accessTokenData.id;

  const sql = `Select n.id, n.userId, n.commentId, c.content, n.isChecked as isChecked from Comments as c join (
    Select noti.id , noti.userId , noti.commentId ,noti.isChecked, com.parentCommentId From Notifications as noti 
    Join Comments as com on noti.commentId = com.id where noti.userId = ${id}) as n On n.parentCommentId = c.id`;
  // const sql2 = `select id,isChecked (select c.content from Comments as c join Notifications as n on c.id = n.commentId where c.userId = 29 ) as content from Notifications where userId = 29`;
  // const sql3 = `select n.id, n.userId,n.commentId,c.content,isChecked from notifications n join (SELECT id, content FROM Comments where parentCommentId = 319)c on n.comm`
  sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then((data) => {
    console.log(333, data);
    return res.status(200).json({ data: data });
  });
};
// Comments.findAll({
//   where: { userId: id },
// }).then((data) => {
//   if (!data) {
//     return res.status(401).send('invalid user');
//   }
//   const id = data.id;
//   Notifications.findAll({
//     where: { commentId: id },
//   }).then((result) => {
//     console.log(999, result);
//   });
// });

// const result = data.map((ele) => {
//     const dataResult = {
//       id: ele.id,
//       userId: ele.userId,
//       commentId: ele.commentId,
//       content: ele.content,
//       parentCommentId: ele.parentCommentId,
//     };
//     return dataResult;
//   });
//   console.log(888, result);
// });

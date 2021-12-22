module.exports = {
  login: require('./users/login'),
  signup: require('./users/signup'),
  auth: require('./users/auth'),
  userInfo: require('./myInfos/userInfo'),
  logout: require('./users/logout'),
  passwordModify: require('./myInfos/passwordModify'),
  signout: require('./users/signout'),
  activity: require('./myInfos/activity'),
  episodeInfos: require('./search/episodeInfos'),
  comments: require('./search/comments'),
  add: require('./comments/add'),
  delete: require('./comments/delete'),
  modify: require('./comments/modify'),
  like: require('./comments/like'),
  reply: require('./comments/reply'),
  notification: require('./myInfos/notification'),
  deleteNotification: require('./myInfos/deleteNotification.'),
  checkNotification: require('./myInfos/checkNotification'),
};

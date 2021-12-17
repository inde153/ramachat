//const { getDrama } = require('../../../client/src/api/DramaDataAPI');
// const { Comments } = require('../../models');
// const axios = require('axios');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  console.log(req);
  const accessTokenData = isAuthorized(req.cookies);
  if (accessTokenData !== null) {
    res.status(200).send({ data: { userInfo: accessTokenData } });
  } else {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  let body = req.body;
  // parentEpisodeId가 없을 때 => 답글이 아닐 때
  if (!body.parentEpisodeId) {
    const { userId, content, episodeId } = body;
    console.log(userId);
  }
  res.end();
  //   let drama_id = req.query['drama-id'];
  //   let season_index = req.query['season-index'];
  //   const episodeInfos = [];
  //   Episode_info.findAll({
  //     where: {
  //       drama_id,
  //       season_index,
  //     },
  //   })
  //     .then((data) => {
  //       // db에 해당 에피소드 정보가 있을 때
  //       // sql db에서 에피소드 정보 받기
  //       if (data.length > 0) {
  //         for (let i = 0; i < data.length; i++) {
  //           //console.log(data[i].dataValues);
  //           let val = data[i].dataValues;
  //           let info = {};
  //           info.id = val.id;
  //           info.episodeIndex = val.episode_index;
  //           info.commentNum = val.comment_num;
  //           episodeInfos.push(info);
  //         }
  //         res.status(200).json(episodeInfos);
  //         // db에 해당 에피소드 정보가 없을 때
  //         // tmdb에서 에피소드 정보 받기
  //       } else {
  //         axios
  //           .get(
  //             `https://api.themoviedb.org/3/tv/${drama_id}/season/${season_index}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  //             {
  //               withCredentials: false,
  //             }
  //           )
  //           .then((result) => {
  //             let data = result.data.episodes;
  //             for (let i = 0; i < data.length; i++) {
  //               let info = {};
  //               info.id = data[i].id;
  //               info.episodeIndex = i + 1;
  //               info.commentNum = 0;
  //               episodeInfos.push(info);
  //             }
  //             res.status(200).json(episodeInfos);
  //           })
  //           .catch((err) => {
  //             res.status(500).send('err');
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send('err');
  //     });
};

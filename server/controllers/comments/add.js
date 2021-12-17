const axios = require('axios');
const { Comments } = require('../../models');
const { Episode_infos } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);
  // 인증 성공
  if (accessTokenData !== null) {
    // body에서 필요한 값 받기
    const {
      userId,
      content,
      dramaId,
      dramaName,
      seasonIndex,
      episodeIndex,
      episodeId,
      parentCommentId,
      commentNum,
    } = req.body;

    // Episode_infos 테이블에 해당 에피소드 아이디를 가진 값이 없을 때  => 첫 댓글
    if (commentNum === 0) {
      // 에피소드 정보 객체 세팅
      let epiInfo = {
        id: episodeId,
        drama_id: dramaId,
        drama_name: dramaName,
        season_index: seasonIndex,
        episode_index: episodeIndex,
      };
      // Episode_infos 테이블에 에피소드 정보 추가
      Episode_infos.create(epiInfo)
        .then((result) => {})
        // 에피소드 정보 삽입 실패
        .catch((err) => {
          console.log('episode information insertion failed');
          console.log(err);
          //res.status(500).send('episode information insertion failed');
        });

      // 새 댓글 객체 세팅
      let newComment = {
        episode_id: episodeId,
        user_id: userId,
        content: content,
        parent_comment_id: parentCommentId,
      };
      // 댓글을 Comments 테이블에 삽입
      Comments.create(newComment)
        .then((result) => {
          console.log(result);
        })
        // 댓글 정보 삽입 실패
        .catch((err) => {
          console.log('comment information insertion failed');
          console.log(err);
        });

      // 댓글 숫자 업데이트
      let newCommentNum = commentNum + 1;
      Episode_infos.update(
        {
          comment_num: newCommentNum,
        },
        {
          where: {
            id: episodeId,
          },
        }
      )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log('comment number update failed');
          console.log(err);
          //res.status(500).send('err');
        });
      // parentEpisodeId가 있을 때 => 답글 O
      // if (parentCommentId) {
      //   console.log();
      // }
      // 인증 실패
    } else {
      res.status(401).send('unauthorized user');
    }
    res.end();
  }
};

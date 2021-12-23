import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import ActivityComment from '../components/ActivityComment';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import { useState, useEffect } from 'react';

axios.defaults.withCredentials = true;

const Main = styled.main`
  width: 100%;
  @media ${device.tablet} {
    background-color: ${colors.white};
    height: calc(100vh - 80px);
    display: flex;
    justify-content: left;
    align-items: left;
  }
`;

const CommentsList = styled.ul`
  padding: 0;
  margin-bottom: 100px;

  h1 {
    padding-left: 10px;
  }

  @media ${device.tablet} {
    margin-bottom: 2rem;
  }
`;

export default function MyPageActivities({ tokenState }) {
  const token = tokenState ? tokenState : sessionStorage.getItem('token');
  const [myComments, setMyComments] = useState({});
  const commentsArray = myComments ? Object.values(myComments) : undefined;
  console.log(commentsArray);

  const getMyComment = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/activity`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + token,
        },
        withCredentials: true,
      })
      .then((data) => {
        setMyComments(data.data.data);
      })
      .catch(() => console.log('getMyComment 에러'));
  };

  useEffect(() => {
    getMyComment();
  }, []);

  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <CommentsList>
          <h1>My Comments</h1>
          {commentsArray.map((comment) => (
            <ActivityComment
              tokenState={tokenState}
              comment={comment}
              userId={comment.userId}
            />
          ))}
        </CommentsList>
      </Main>
    </>
  );
}

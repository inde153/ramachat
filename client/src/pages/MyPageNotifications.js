import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import Notification from '../components/Notification';
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

const NotificationsList = styled.ul`
  padding: 0;
  margin-top: 1px;
  margin-bottom: 100px;

  @media ${device.tablet} {
    margin-bottom: 2rem;
  }

  h1 {
    padding-left: 1rem;
  }
`;

export default function MyPageNotifications({ tokenState }) {
  const token = tokenState ? tokenState : sessionStorage.getItem('token');
  const [myNotifications, setMyNotifications] = useState([]);
  const notiArray = myNotifications ? myNotifications : [];
  console.log(notiArray);

  const getMyNotifications = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/notification`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + token,
        },
        withCredentials: true,
      })
      .then((data) => {
        setMyNotifications(data.data.data.reverse());
      })
      .catch(() => console.log('getMyNotifications 에러'));
  };

  useEffect(() => {
    getMyNotifications();
  }, []);

  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <NotificationsList>
          <h1>My Notification</h1>
          {notiArray.map((noti) => (
            <Notification
              content={noti.content}
              propsIsCheckedFromDb={noti.isChecked}
              tokenState={tokenState}
              notiId={noti.id}
            />
          ))}
        </NotificationsList>
      </Main>
    </>
  );
}

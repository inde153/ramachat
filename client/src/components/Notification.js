import styled from 'styled-components';
import axios from 'axios';
import IconButton from './IconButton';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import { useState } from 'react';

axios.defaults.withCredentials = true;

// 클릭시 색 바꾸기 (checked, unchecked) => 탭바에도 적용

const Main = styled.article`
  width: 100%;
  /* padding: 1rem; */
  /* border: 1px solid ${colors.black}; */
  display: ${(props) => (props.isDeleted ? 'none' : 'block')};
`;

const NotificationContainer = styled.div`
  display: flex;
  height: 20%;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-top: 1px solid ${colors.primary};
  // 체크 이전(0)은 핑크색, 체크 이후(1)는 하얀색
  background-color: ${(props) =>
    props.colorChangeIsChecked === 1 ? 'white' : `${colors.primaryL}`};

  div {
    display: flex;
    gap: 0.5rem;
  }

  p {
    padding-left: 10px;
  }

  span.quote {
    display: inline-block;
    vertical-align: middle;
    max-width: 100px;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @media ${device.tablet} {
      max-width: 240px;
    }
  }
`;

export default function Notification({
  content,
  propsIsCheckedFromDb,
  tokenState,
  notiId,
}) {
  const token = tokenState ? tokenState : sessionStorage.getItem('token');

  // 삭제 기능
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deleteNotification/${notiId}`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + tokenState,
        },
        withCredentials: true,
      })
      .then(() => {
        setIsDeleted(true);
      })
      .catch(() => console.log('handleDelete 에러'));
  };

  // 체크 기능
  const [colorChangeIsChecked, setChecked] = useState(propsIsCheckedFromDb);
  const handleCheck = () => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/checkNotification/${notiId}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            'Content-Type': `application/json`,
            authorization: 'Bearer ' + token,
          },
        }
      )
      .then((data) => {
        setChecked(1);
      })
      .catch(() => console.log('handleCheck 에러'));
  };

  return (
    <>
      <Main isDeleted={isDeleted}>
        <NotificationContainer
          propsIsCheckedFromDb={propsIsCheckedFromDb}
          colorChangeIsChecked={colorChangeIsChecked}
        >
          <p>
            [<span className="quote">{content}</span>]에 답글이 달렸습니다.
          </p>
          <div>
            <IconButton color="grey" onClick={handleCheck}>
              <i class="far fa-check-square"></i>
            </IconButton>
            <IconButton color="grey" onClick={handleDelete}>
              <i class="far fa-trash-alt"></i>
            </IconButton>
          </div>
        </NotificationContainer>
      </Main>
    </>
  );
}

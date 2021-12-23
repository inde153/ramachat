import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import { Link } from 'react-router-dom';
import IconButton from '../components/IconButton';

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  justify-content: left;
  align-items: center;
  /* position: fixed;
  left: 0;
  top: 0;
  bottom: 0; */

  padding: 1.3rem;
  cursor: pointer;
  background-color: ${colors.primaryL};

  @media ${device.tablet} {
    // ! 반응형 수정
    height: calc(100vh - 80px);
    display: flex;
    justify-content: left;
    align-items: left;
  }
`;

export default function Tabbar() {
  return (
    <TabContainer>
      <Link to="/mypage/personal-information">
        <IconButton color="primary" fontSize="2rem">
          <i class="far fa-user"></i>
        </IconButton>
      </Link>
      <br />
      <Link to="/mypage/my-activities">
        <IconButton color="primary" fontSize="2rem">
          <i class="far fa-comment-dots"></i>
        </IconButton>
      </Link>
      <br />
      <Link to="/mypage/notifications">
        <IconButton color="primary" fontSize="2rem">
          <i class="far fa-bell"></i>
        </IconButton>
      </Link>
    </TabContainer>
  );
}

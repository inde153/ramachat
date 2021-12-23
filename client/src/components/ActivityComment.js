import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CommentContainer = styled.article`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid ${colors.primary};
  display: ${(props) => (props.hasDeleted ? 'none' : 'block')};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: 0.5rem;
  }
`;

const CommentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .created-date {
    color: ${colors.grey};
  }
`;

export default function ActivityComment({ comment, userId }) {
  const [content, setContent] = useState(comment.content);

  const handleLink = () => {
    console.log('링크로 이동 수정');
  };

  const createdAt = new Date(comment.createdAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });

  return (
    <>
      <CommentContainer>
        <CommentInfoContainer>
          <p>이름없는라마</p>
          <p className="created-date">{createdAt}</p>
        </CommentInfoContainer>
        <p>{content}</p>
        <ButtonContainer>
          {comment.userId === userId ? (
            <div className="edit-comment">
              <Link
                to={`/drama/${comment.dramaId}/comments/season/${comment.seasonIndex}/episode/${comment.episodeIndex}`}
              >
                <IconButton color="grey" onClick={handleLink}>
                  <i class="fas fa-external-link-alt"></i> Click to Link
                </IconButton>
              </Link>
            </div>
          ) : null}
        </ButtonContainer>
      </CommentContainer>
    </>
  );
}

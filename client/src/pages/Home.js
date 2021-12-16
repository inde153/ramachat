import styled from 'styled-components';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  return (
    <div>
      {/* <Navbar /> */}
      <Main>
        <h1>Start the chat about the series you like!</h1>
        <SearchBar />
      </Main>
    </div>
  );
}
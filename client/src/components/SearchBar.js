import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/Colors';

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  border-radius: 0;
  border: 2px solid ${colors.primary};
`;

const SearchButton = styled.button`
  height: 40px;
  padding: 10px;
  margin: 0;
  border-radius: 0;
  border: none;
  background-color: ${colors.primary};
  color: white;
  cursor: pointer;
`;

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${keyword}`);
  };

  return (
    <div>
      <form>
        <SearchInput
          type="text"
          placeholder="Search the series"
          onKeyUp={handleInputChange}
        ></SearchInput>
        <SearchButton type="submit" onClick={handleSubmit}>
          Search
        </SearchButton>
      </form>
    </div>
  );
}
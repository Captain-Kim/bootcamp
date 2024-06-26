import { useState } from 'react';
import styled from 'styled-components';
import inputimage from '../image/inputimage.png';

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 3px solid #343434;
  border-radius: 5px;
  width: 300px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const InputImage = styled.img`
  padding-top: 70px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const HomeInput = ({ onSearch }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchFeed, setSearchFeed] = useState('');

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleSearch = (e) => {
    setSearchFeed(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <InputImage src={inputimage} onClick={toggleInput} />
      <SearchInput
        show={showInput ? 'true' : undefined}
        placeholder="검색어를 입력하세요!"
        value={searchFeed}
        onChange={handleSearch}
      />
    </>
  );
};

export default HomeInput;

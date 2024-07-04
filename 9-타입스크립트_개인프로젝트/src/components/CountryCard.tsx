import styled, { css } from 'styled-components';
import { CountryData } from '../types/countryTypes';

const StyledCard = styled.div<{ selected?: boolean }>`
  border: 1px solid black;
  border-radius: 20px;
  width: 250px;
  height: 150px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${(props) =>
    props.selected &&
    css`
      border-color: blue;
    `}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledFlagImg = styled.div`
  width: 100px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledTitle = styled.div`
  font-size: 25px;
  margin: 0 auto;
  font-weight: 800;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

interface CountryCardProps {
  country: CountryData;
  onCountryClick: (country: CountryData) => void;
  selected: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onCountryClick, selected }) => {
  const handleClick = () => {
    if (onCountryClick) {
      onCountryClick(country);
    }
  };

  return (
    <StyledCard onClick={handleClick} selected={selected}>
      <StyledFlagImg>
        <img src={country.flags.png} alt={`국기 이미지`} />
      </StyledFlagImg>
      <StyledTitle>{country.name.common}</StyledTitle>
      <p>{country.capital?.[0] ?? '수도 정보가 없습니다'}</p>
    </StyledCard>
  );
};

export default CountryCard;
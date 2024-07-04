import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CountryCard from './CountryCard';
import { CountryData } from '../types/countryTypes';
import useCountryQuery from '../hooks/useCountryQuery';

const StyledCardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CountryList = () => {
  const { data: countries, isPending, isError } = useCountryQuery();
  const [favoriteCountries, setFavoriteCountries] = useState<CountryData[]>([]);
  const [availableCountries, setAvailableCountries] = useState<CountryData[]>([]);

  const test = () => {
    if (countries) {
      console.log(countries[0].name.common + 1111);
    } else {console.log('no')}
  }

  const a : number = 1;
  const b : string = "1";
  console.log(a + b);

  useEffect(() => {
    test();
    if (countries) {
      setAvailableCountries(countries);
    }
  }, [countries]);

  const addFavoriteCountry = (country: CountryData) => {
    setFavoriteCountries([...favoriteCountries, country]);
    setAvailableCountries(availableCountries.filter(c => c.cca3 !== country.cca3));
  };

  const removeFavoriteCountry = (country: CountryData) => {
    setFavoriteCountries(favoriteCountries.filter(c => c.cca3 !== country.cca3));
    setAvailableCountries([...availableCountries, country]);
  };

  if (isPending) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      <h1>내가 좋아하는 나라들</h1>
      <StyledCardSection>
        {favoriteCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} onCountryClick={removeFavoriteCountry} selected />
        ))}
      </StyledCardSection>
      <h1>여기서 나라를 골라 보세요</h1>
      <StyledCardSection>
        {availableCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} onCountryClick={addFavoriteCountry} />
        ))}
      </StyledCardSection>
    </>
  );
};

export default CountryList;
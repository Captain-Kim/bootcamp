import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchCountry } from '../api/api';
import { CountryData } from '../types/countryTypes';

const useCountryQuery = (): UseQueryResult<CountryData[], Error> => {
  return useQuery<CountryData[], Error>({
    queryKey: ['country'],
    queryFn: fetchCountry,
  });
};

export default useCountryQuery;
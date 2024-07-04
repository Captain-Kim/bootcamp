import axios from 'axios';
import { CountryData } from '../types/countryTypes';

export const fetchCountry = async (): Promise<CountryData[]> => {
  const response = await axios.get<CountryData[]>('https://restcountries.com/v3.1/all');
  console.log(response.data)
  return response.data;
};
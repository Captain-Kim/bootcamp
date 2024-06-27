import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../components/api/api';

const usePlaces = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPlaces,
  });
};

export default usePlaces;
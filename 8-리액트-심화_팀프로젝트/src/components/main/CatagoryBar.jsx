import React, { useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import usePlaces from '../../hooks/usePlaces';
import useFileterStore from '../../store/useFileterStore';

const CatagoryBarWarp = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(205, 205, 205);
  padding: 2rem;
  display: flex;
  align-items: center;
`;

const SelectStyle = styled(Select)`
  width: 200px;
  height: 36px;
  font-size: 14px;
  margin-right: 20px;
`;

const AreaOptions = [
  { value: '모든 지역', label: '모든 지역' },
  { value: '서울', label: '서울' },
  { value: '강원도', label: '강원도' },
  { value: '경기도', label: '경기도' },
  { value: '경상도', label: '경상도' },
  { value: '충청도', label: '충청도' },
  { value: '전라도', label: '전라도' },
  { value: '제주', label: '제주' }
];
const TypeOptions = [
  { value: '모든 장르', label: '모든 장르' },
  { value: '음악', label: '음악' },
  { value: '음식', label: '음식' },
  { value: '전통', label: '전통' },
  { value: '예술', label: '예술' },
  { value: '기타', label: '기타' }
];
const NowOptions = [
  { value: '모든 축제', label: '모든 축제' },
  { value: '진행 예정', label: '진행 예정' },
  { value: '진행중', label: '진행중' },
  { value: '지난 축제', label: '지난 축제' }
];

export default function CatagoryBar() {
  const placesData = usePlaces();

  const selectedArea = useFileterStore((state) => state.selectedArea);
  const selectedType = useFileterStore((state) => state.selectedType);
  const selectedNow = useFileterStore((state) => state.selectedNow);
  const searchTerm = useFileterStore((state) => state.searchTerm);
  const setSelectedArea = useFileterStore((state) => state.setSelectedArea);
  const setSelectedType = useFileterStore((state) => state.setSelectedType);
  const setSelectedNow = useFileterStore((state) => state.setSelectedNow);
  const setFilteredData = useFileterStore((state) => state.setFilteredData);

  const handleAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const handleNowChange = (selectedOption) => {
    setSelectedNow(selectedOption);
  };

  useEffect(() => {
    if (!placesData.data) return;

    let updatedData = placesData.data;

    if (selectedArea && selectedArea.value !== '모든 지역') {
      updatedData = updatedData.filter((item) => item.region === selectedArea.value);
    }

    if (selectedType && selectedType.value !== '모든 장르') {
      updatedData = updatedData.filter((item) => item.category === selectedType.value);
    }

    if (selectedNow && selectedNow.value !== '모든 축제') {
      const now_date = new Date();
      updatedData = updatedData.filter((item) => {
        const st_date = new Date(item.st_date);
        st_date.setHours(0, 0, 0, 0);
        const ed_date = new Date(item.ed_date);
        ed_date.setDate(ed_date.getDate() + 1);
        ed_date.setHours(0, 0, 0, 0);
        if (selectedNow.value === '진행 예정') {
          return st_date > now_date;
        } else if (selectedNow.value === '진행중') {
          return st_date <= now_date && now_date <= ed_date;
        } else if (selectedNow.value === '지난 축제') {
          return ed_date < now_date;
        }
      });
    }

    if (searchTerm && searchTerm !== '') {
      updatedData = updatedData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredData(updatedData);
  }, [placesData.data, selectedArea, selectedType, selectedNow, searchTerm, setFilteredData]);

  return (
    <CatagoryBarWarp>
      <SelectStyle value={selectedArea} onChange={handleAreaChange} options={AreaOptions} placeholder="지역" />
      <SelectStyle value={selectedType} onChange={handleTypeChange} options={TypeOptions} placeholder="장르" />
      <SelectStyle value={selectedNow} onChange={handleNowChange} options={NowOptions} placeholder="진행 상황" />
    </CatagoryBarWarp>
  );
}

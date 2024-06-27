import create from 'zustand';

const useFileterStore = create((set) => ({
  selectedArea: { value: '모든 지역', label: '모든 지역' },
  selectedType: { value: '모든 장르', label: '모든 장르' },
  selectedNow: { value: '모든 축제', label: '모든 축제' },
  searchTerm: '',
  filteredData: [],
  setSelectedArea: (area) => set({ selectedArea: area }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedNow: (now) => set({ selectedNow: now }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilteredData: (data) => set({ filteredData: data })
}));

export default useFileterStore;

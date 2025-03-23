import create from "zustand";

export const useSearch = create((set) => ({
  results: [],
  setResults: (res) => set(() => ({ results: res })), 
  searchTerm: [],
  setSearchTerm: (res) => set(() => ({ searchTerm: res })), 
}));

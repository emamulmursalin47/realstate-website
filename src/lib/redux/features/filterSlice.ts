/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  propertyType: string[];
  location: string[];
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
  viewMode: 'grid' | 'list';
}

const initialState: FiltersState = {
  propertyType: [],
  location: [],
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  sortBy: 'newest',
  viewMode: 'grid',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPropertyType: (state, action: PayloadAction<string[]>) => {
      state.propertyType = action.payload;
    },
    setLocation: (state, action: PayloadAction<string[]>) => {
      state.location = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | null>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
    setBedrooms: (state, action: PayloadAction<number | null>) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action: PayloadAction<number | null>) => {
      state.bathrooms = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'price_asc' | 'price_desc' | 'newest' | 'oldest'>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setPropertyType,
  setLocation,
  setMinPrice,
  setMaxPrice,
  setBedrooms,
  setBathrooms,
  setSortBy,
  setViewMode,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
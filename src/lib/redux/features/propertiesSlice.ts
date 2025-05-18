/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/redux/features/propertiesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number;
  currency: string;
  status: 'available' | 'sold' | 'pending';
  featured: boolean;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  unitOfMeasurement?: string;
  parkingSpaces?: number;
  yearBuilt?: number;
  amenities?: string[];
  images: string[];
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

interface PropertiesState {
  properties: Property[];
  featuredProperties: Property[];
  currentProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  properties: [],
  featuredProperties: [],
  currentProperty: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/properties');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch properties');
    }
  }
);

export const fetchFeaturedProperties = createAsyncThunk(
  'properties/fetchFeaturedProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/properties/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch featured properties');
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchPropertyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/properties/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch property');
    }
  }
);

export const createProperty = createAsyncThunk(
  'properties/createProperty',
  async (propertyData: Partial<Property>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/properties', propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create property');
    }
  }
);

export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async ({ id, data }: { id: string; data: Partial<Property> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/properties/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update property');
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/properties/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete property');
    }
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured properties
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.loading = false;
        state.featuredProperties = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch property by ID
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action: PayloadAction<Property>) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action: PayloadAction<Property>) => {
        state.loading = false;
        state.properties.push(action.payload);
        if (action.payload.featured) {
          state.featuredProperties.push(action.payload);
        }
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action: PayloadAction<Property>) => {
        state.loading = false;
        const index = state.properties.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        
        const featuredIndex = state.featuredProperties.findIndex((p) => p.id === action.payload.id);
        if (action.payload.featured) {
          if (featuredIndex !== -1) {
            state.featuredProperties[featuredIndex] = action.payload;
          } else {
            state.featuredProperties.push(action.payload);
          }
        } else if (featuredIndex !== -1) {
          state.featuredProperties.splice(featuredIndex, 1);
        }
        
        if (state.currentProperty?.id === action.payload.id) {
          state.currentProperty = action.payload;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.properties = state.properties.filter((p) => p.id !== action.payload);
        state.featuredProperties = state.featuredProperties.filter((p) => p.id !== action.payload);
        if (state.currentProperty?.id === action.payload) {
          state.currentProperty = null;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProperty, clearError } = propertiesSlice.actions;
export default propertiesSlice.reducer;
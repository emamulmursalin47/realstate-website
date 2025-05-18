/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/redux/features/inquiriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

interface InquiriesState {
  inquiries: Inquiry[];
  currentInquiry: Inquiry | null;
  loading: boolean;
  error: string | null;
}

const initialState: InquiriesState = {
  inquiries: [],
  currentInquiry: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchInquiries = createAsyncThunk(
  'inquiries/fetchInquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/inquiries');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch inquiries');
    }
  }
);

export const fetchInquiryById = createAsyncThunk(
  'inquiries/fetchInquiryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/inquiries/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch inquiry');
    }
  }
);

export const createInquiry = createAsyncThunk(
  'inquiries/createInquiry',
  async (inquiryData: Partial<Inquiry>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/inquiries', inquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create inquiry');
    }
  }
);

export const updateInquiryStatus = createAsyncThunk(
  'inquiries/updateInquiryStatus',
  async ({ id, status }: { id: string; status: 'read' | 'unread' }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/inquiries/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update inquiry status');
    }
  }
);

export const deleteInquiry = createAsyncThunk(
  'inquiries/deleteInquiry',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/inquiries/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete inquiry');
    }
  }
);

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    clearCurrentInquiry: (state) => {
      state.currentInquiry = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch inquiries
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action: PayloadAction<Inquiry[]>) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch inquiry by ID
      .addCase(fetchInquiryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiryById.fulfilled, (state, action: PayloadAction<Inquiry>) => {
        state.loading = false;
        state.currentInquiry = action.payload;
      })
      .addCase(fetchInquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create inquiry
      .addCase(createInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInquiry.fulfilled, (state, action: PayloadAction<Inquiry>) => {
        state.loading = false;
        state.inquiries.push(action.payload);
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update inquiry status
      .addCase(updateInquiryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInquiryStatus.fulfilled, (state, action: PayloadAction<Inquiry>) => {
        state.loading = false;
        const index = state.inquiries.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.inquiries[index] = action.payload;
        }
        if (state.currentInquiry?.id === action.payload.id) {
          state.currentInquiry = action.payload;
        }
      })
      .addCase(updateInquiryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete inquiry
      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInquiry.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.inquiries = state.inquiries.filter((i) => i.id !== action.payload);
        if (state.currentInquiry?.id === action.payload) {
          state.currentInquiry = null;
        }
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentInquiry, clearError } = inquiriesSlice.actions;
export default inquiriesSlice.reducer;
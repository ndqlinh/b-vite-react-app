import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '@config/endpoint';
import ApiService from '@shared/services/api.service';
import ACTION_TYPES from 'app/stores/action-types';

interface AccountStoreInterface {
  type: string;
  data: any;
  hasError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AccountStoreInterface = {
  type: '',
  data: null,
  hasError: false,
  isLoading: false,
  error: ''
};

const api = new ApiService();

export const getProfile = createAsyncThunk(
  ACTION_TYPES.ACCOUNT.GET,
  async (_, thunkAPI) => {
    try {
      const response: any = await api.get([ENDPOINT.profile]);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  ACTION_TYPES.ACCOUNT.UPDATE,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await api.put([ENDPOINT.profile], data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state: any) => {
        state.type = ACTION_TYPES.ACCOUNT.GET;
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.ACCOUNT.GET;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getProfile.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.ACCOUNT.GET;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      })
      .addCase(updateProfile.pending, (state: any) => {
        state.type = ACTION_TYPES.ACCOUNT.UPDATE;
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.ACCOUNT.UPDATE;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(updateProfile.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.ACCOUNT.UPDATE;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      })
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '@config/endpoint';
import ApiService from '@shared/services/api.service';

interface AccountStoreInterface {
  data: any;
  hasError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AccountStoreInterface = {
  data: null,
  hasError: false,
  isLoading: false,
  error: ''
};

const api = new ApiService();

export const getProfile = createAsyncThunk(
  ENDPOINT.profile,
  async (_, thunkAPI) => {
    try {
      const response: any = await api.get([ENDPOINT.profile]);
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
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getProfile.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.message;
      })
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@shared/services/auth.service';
import { ENDPOINT } from '@config/endpoint';

interface AuthStoreInterface {
  data: any;
  hasError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthStoreInterface = {
  data: null,
  hasError: false,
  isLoading: false,
  error: ''
};

const auth = new AuthService();

export const signup = createAsyncThunk(
  ENDPOINT.auth.signup,
  async (data: any, thunkAPI) => {
    try {
      return await auth.signUp(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  ENDPOINT.auth.signin,
  async (data: any, thunkAPI) => {
    try {
      return auth.signIn(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(signup.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload.message;
      })
      .addCase(signin.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(signin.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload.message;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

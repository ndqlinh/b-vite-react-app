import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@shared/services/auth.service';
import { ENDPOINT } from '@config/endpoint';
import ACTION_TYPES from 'app/stores/action-types';

interface AuthStoreInterface {
  type: string;
  data: any;
  hasError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthStoreInterface = {
  type: '',
  data: null,
  hasError: false,
  isLoading: false,
  error: ''
};

const auth = new AuthService();

export const signup = createAsyncThunk(
  ACTION_TYPES.AUTH.SIGN_UP,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await auth.signUp(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  ACTION_TYPES.AUTH.SIGN_IN,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await auth.signIn(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  ACTION_TYPES.AUTH.RESET_PASSWORD,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await auth.resetPassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginSso = createAsyncThunk(
  ACTION_TYPES.AUTH.SSO,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await auth.loginSso(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authorize = createAsyncThunk(
  ACTION_TYPES.AUTH.AUTHORIZATION,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await auth.authorize(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
        state.type = ACTION_TYPES.AUTH.SIGN_UP;
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.SIGN_UP;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(signup.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.SIGN_UP;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      })
      .addCase(signin.pending, (state: any) => {
        state.type = ACTION_TYPES.AUTH.SIGN_IN;
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.SIGN_IN;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(signin.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.SIGN_IN;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      })
      .addCase(resetPassword.pending, (state: any) => {
        state.type = ACTION_TYPES.AUTH.RESET_PASSWORD;
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.RESET_PASSWORD;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(resetPassword.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.RESET_PASSWORD;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      })
      .addCase(loginSso.pending, (state: any) => {
        state.type = ACTION_TYPES.AUTH.SSO;
        state.isLoading = true;
      })
      .addCase(loginSso.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.SSO;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(loginSso.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.SSO;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      })
      .addCase(authorize.pending, (state: any) => {
        state.type = ACTION_TYPES.AUTH.AUTHORIZATION;
        state.isLoading = true;
      })
      .addCase(authorize.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.AUTHORIZATION;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(authorize.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.AUTH.AUTHORIZATION;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.response?.data?.message;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

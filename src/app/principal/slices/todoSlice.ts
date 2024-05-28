import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '@config/endpoint';
import ApiService from '@shared/services/api.service';

interface TodoStoreInterface {
  data: any;
  hasError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: TodoStoreInterface = {
  data: null,
  hasError: false,
  isLoading: false,
  error: ''
};

const api = new ApiService();

export const createTodo = createAsyncThunk(
  ENDPOINT.task,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await api.post([ENDPOINT.task], data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTodoList = createAsyncThunk(
  ENDPOINT.task,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await api.get([ENDPOINT.task]);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(createTodo.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.message;
      })
      .addCase(getTodoList.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getTodoList.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getTodoList.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.message;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;

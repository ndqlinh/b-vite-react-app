import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT } from '@config/endpoint';
import ApiService from '@shared/services/api.service';
import ACTION_TYPES from 'app/stores/action-types';

interface TodoStoreInterface {
  type: string;
  data: any;
  hasError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: TodoStoreInterface = {
  type: '',
  data: null,
  hasError: false,
  isLoading: false,
  error: ''
};

const api = new ApiService();

export const saveTodo = createAsyncThunk(
  ACTION_TYPES.TODO.SAVE,
  async (data: any, thunkAPI) => {
    try {
      delete data.createdAt;
      const response: any = data.id
        ? await api.put([ENDPOINT.task], data)
        : await api.post([ENDPOINT.task], data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTodoList = createAsyncThunk(
  ACTION_TYPES.TODO.LIST,
  async (_, thunkAPI) => {
    try {
      const response: any = await api.get([ENDPOINT.task]);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  ACTION_TYPES.TODO.DELETE,
  async (data: any, thunkAPI) => {
    try {
      const response: any = await api.delete([`${ENDPOINT.task}/${data.id}`]);
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
      .addCase(saveTodo.pending, (state: any) => {
        state.type = ACTION_TYPES.TODO.SAVE;
        state.isLoading = true;
      })
      .addCase(saveTodo.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.TODO.SAVE;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(saveTodo.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.TODO.SAVE;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.message;
      })
      .addCase(getTodoList.pending, (state: any) => {
        state.type = ACTION_TYPES.TODO.LIST;
        state.isLoading = true;
      })
      .addCase(getTodoList.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.TODO.LIST;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(getTodoList.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.TODO.LIST;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.message;
      })
      .addCase(deleteTodo.pending, (state: any) => {
        state.type = ACTION_TYPES.TODO.DELETE;
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state: any, action: any) => {
        state.type = ACTION_TYPES.TODO.DELETE;
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(deleteTodo.rejected, (state: any, action: any) => {
        state.type = ACTION_TYPES.TODO.DELETE;
        state.isLoading = false;
        state.hasError = true;
        state.error = action?.payload?.message;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadUser = createAsyncThunk('user/loadUser', async (thunkAPI) => {
  try {
    const res = await fetch('/api/me', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to load user');
    }

    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    clearUser(state) {
      state.user = null;
      state.error = null;
    },

    updateUser(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

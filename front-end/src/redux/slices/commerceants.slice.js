import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commerceantsService } from '../../services/commerceants.service';

const initialState = { items: [], loading: false, error: null };

export const fetchCommerceants = createAsyncThunk('commerceants/fetch', async () => commerceantsService.list());
export const createCommerceant = createAsyncThunk('commerceants/create', async (dto) => commerceantsService.create(dto));
export const updateCommerceant = createAsyncThunk('commerceants/update', async ({ id, dto }) => commerceantsService.update(id, dto));

const commerceantsSlice = createSlice({
  name: 'commerceants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommerceants.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchCommerceants.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchCommerceants.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(createCommerceant.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateCommerceant.fulfilled, (s, a) => {
        const i = s.items.findIndex((c) => c.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
      });
  },
});

export default commerceantsSlice.reducer;
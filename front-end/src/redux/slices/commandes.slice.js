import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commandesService } from '../../services/commandes.service';

const initialState = { items: [], loading: false, error: null };

export const fetchCommandes = createAsyncThunk(
  'commandes/fetch',
  async ({ commerceantId, statut }) => commandesService.list({ commerceantId, statut })
);

export const createCommande = createAsyncThunk(
  'commandes/create',
  async (dto) => commandesService.create(dto)
);

export const updateCommande = createAsyncThunk(
  'commandes/update',
  async ({ id, dto }) => commandesService.update(id, dto)
);

export const deleteCommande = createAsyncThunk(
  'commandes/delete',
  async (id) => {
    await commandesService.remove(id);
    return id;
  }
);

const commandesSlice = createSlice({
  name: 'commandes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommandes.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCommandes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCommandes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCommande.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateCommande.fulfilled, (state, action) => {
        const idx = state.items.findIndex((c) => c.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteCommande.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default commandesSlice.reducer;
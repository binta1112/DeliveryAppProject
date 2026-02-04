import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { demandesLivraisonService } from '../../services/demandes-livraison.service';

const initialState = { items: [], current: null, loading: false, error: null };

export const fetchDemandesLivraison = createAsyncThunk(
  'demandesLivraison/fetch',
  async (filters = {}) => demandesLivraisonService.list(filters)
);

export const fetchDemandeLivraisonById = createAsyncThunk(
  'demandesLivraison/fetchById',
  async (id) => demandesLivraisonService.get(id)
);

export const createDemandeLivraison = createAsyncThunk(
  'demandesLivraison/create',
  async (dto) => demandesLivraisonService.create(dto)
);

export const acceptDemandeProposal = createAsyncThunk(
  'demandesLivraison/acceptProposal',
  async ({ demandeId, proposalId }) =>
    demandesLivraisonService.acceptProposal(demandeId, proposalId)
);

const demandesLivraisonSlice = createSlice({
  name: 'demandesLivraison',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemandesLivraison.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchDemandesLivraison.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchDemandesLivraison.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(fetchDemandeLivraisonById.fulfilled, (s, a) => { s.current = a.payload; })
      .addCase(createDemandeLivraison.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(acceptDemandeProposal.fulfilled, (s, a) => {
        s.current = a.payload;
        const idx = s.items.findIndex((d) => d.id === a.payload.id);
        if (idx >= 0) s.items[idx] = a.payload;
      });
  },
});

export default demandesLivraisonSlice.reducer;
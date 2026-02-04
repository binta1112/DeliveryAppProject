import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { propositionsPrixService } from '../../services/propositions-prix.service';

const initialState = { byDemande: {}, loading: false, error: null };

export const fetchPropositionsByDemande = createAsyncThunk(
  'propositionsPrix/fetchByDemande',
  async (demandeId) => {
    const data = await propositionsPrixService.listByDemande(demandeId);
    return { demandeId, data };
  }
);

export const createPropositionPrix = createAsyncThunk(
  'propositionsPrix/create',
  async (dto) => propositionsPrixService.create(dto)
);

const propositionsPrixSlice = createSlice({
  name: 'propositionsPrix',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropositionsByDemande.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPropositionsByDemande.fulfilled, (s, a) => {
        s.loading = false;
        s.byDemande[a.payload.demandeId] = a.payload.data;
      })
      .addCase(fetchPropositionsByDemande.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(createPropositionPrix.fulfilled, (s, a) => {
        const demandeId = a.payload.demandeLivraison?.id;
        if (demandeId) {
          const list = s.byDemande[demandeId] || [];
          s.byDemande[demandeId] = [a.payload, ...list];
        }
      });
  },
});

export default propositionsPrixSlice.reducer;
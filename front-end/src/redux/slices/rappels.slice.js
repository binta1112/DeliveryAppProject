import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rappelCommandesService } from '../../services/rappel-commandes.service';

const initialState = { pending: [], loading: false, error: null };

export const fetchPendingRappels = createAsyncThunk('rappels/fetchPending', async () => rappelCommandesService.pending());
export const markRappelRead = createAsyncThunk('rappels/markRead', async (rappelId) => rappelCommandesService.markRead(rappelId));

const rappelsSlice = createSlice({
  name: 'rappels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingRappels.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPendingRappels.fulfilled, (s, a) => { s.loading = false; s.pending = a.payload; })
      .addCase(fetchPendingRappels.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(markRappelRead.fulfilled, (s, a) => {
        s.pending = s.pending.filter((r) => r.id !== a.payload.id);
      });
  },
});

export default rappelsSlice.reducer;
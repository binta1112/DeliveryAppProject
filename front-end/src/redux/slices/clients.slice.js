import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientsService } from '../../services/clients.service';

const initialState = { items: [], loading: false, error: null };

export const fetchClients = createAsyncThunk(
  'clients/fetch',
  async ({ commerceantId }, { rejectWithValue }) => {
    try {
      return await clientsService.list(commerceantId);
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const createClient = createAsyncThunk(
  'clients/create',
  async (dto, { rejectWithValue }) => {
    try {
      return await clientsService.create(dto);
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateClient = createAsyncThunk('clients/update', async ({ id, dto }) => {
  return await clientsService.update(id, dto);
});

export const deleteClient = createAsyncThunk('clients/delete', async (id) => {
  await clientsService.remove(id);
  return id;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchClients.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchClients.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      })
      .addCase(createClient.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      })
      .addCase(updateClient.fulfilled, (s, a) => {
        const i = s.items.findIndex((c) => c.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
      })
      .addCase(deleteClient.fulfilled, (s, a) => {
        s.items = s.items.filter((c) => c.id !== a.payload);
      });
  },
});

export default clientsSlice.reducer;
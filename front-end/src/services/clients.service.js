import { api } from '../api/client';

export const clientsService = {
  async list() {
    const { data } = await api.get('/clients');
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/clients/${id}`);
    return data;
  },
  async create(dto) {
    const { data } = await api.post('/clients', dto);
    return data;
  },
  async update(id, dto) {
    const { data } = await api.patch(`/clients/${id}`, dto);
    return data;
  },
  async remove(id) {
    await api.delete(`/clients/${id}`);
  },
};
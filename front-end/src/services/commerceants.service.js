import { api } from '../api/client';

export const commerceantsService = {
  async list() {
    const { data } = await api.get('/commerceants');
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/commerceants/${id}`);
    return data;
  },
  async create(dto) {
    const { data } = await api.post('/commerceants', dto);
    return data;
  },
  async update(id, dto) {
    const { data } = await api.patch(`/commerceants/${id}`, dto);
    return data;
  },
  async listCommandes(id) {
    const { data } = await api.get(`/commerceants/${id}/commandes`);
    return data;
  },
};
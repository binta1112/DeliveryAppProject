import { api } from '../api/client';
import { CommandeStatus } from '../types/commande';

export const commandesService = {
  async list(params) {
    const { data } = await api.get('/commandes', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/commandes/${id}`);
    return data;
  },
  async create(dto) {
    const { data } = await api.post('/commandes', dto);
    return data;
  },
  async update(id, dto) {
    const { data } = await api.patch(`/commandes/${id}`, dto);
    return data;
  },
  async remove(id) {
    await api.delete(`/commandes/${id}`);
  },
  CommandeStatus,
};
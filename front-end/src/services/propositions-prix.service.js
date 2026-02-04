import { api } from '../api/client';

export const propositionsPrixService = {
  async listByDemande(demandeId) {
    const { data } = await api.get('/price-proposals', { params: { demandeId } });
    return data;
  },
  async create(dto) {
    const { data } = await api.post('/price-proposals', dto);
    return data;
  },
};
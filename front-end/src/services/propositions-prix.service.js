import { api } from '../api/client';

export const propositionsPrixService = {
  async create(dto) {
    const { data } = await api.post('/price-proposals', dto);
    return data;
  },
  async listByDemande(demandeId) {
    const { data } = await api.get('/price-proposals', { params: { demandeId } });
    return data;
  },
  async listByLivreur(livreurId) {
    const { data } = await api.get('/price-proposals/by-livreur', { params: { livreurId } });
    return data;
  },
};
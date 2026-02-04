import { api } from '../api/client';

export const demandesLivraisonService = {
  async list(params) {
    const { data } = await api.get('/delivery-requests', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/delivery-requests/${id}`);
    return data;
  },
  async create(dto) {
    const { data } = await api.post('/delivery-requests', dto);
    return data;
  },
  async close(id) {
    const { data } = await api.patch(`/delivery-requests/${id}/close`);
    return data;
  },
  async acceptProposal(id, proposalId) {
    const { data } = await api.patch(`/delivery-requests/${id}/accept-proposal/${proposalId}`);
    return data;
  },
};
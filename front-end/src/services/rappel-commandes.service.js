import { api } from '../api/client';

export const rappelCommandesService = {
  async pending() {
    const { data } = await api.get('/rappel-commandes/pending');
    return data;
  },
  async markRead(rappelId) {
    const { data } = await api.patch('/rappel-commandes/mark-read', { rappelId });
    return data;
  },
  async forCommande(commandeId) {
    const { data } = await api.get(`/rappel-commandes/commande/${commandeId}`);
    return data;
  },
};
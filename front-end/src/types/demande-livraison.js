export const DemandeLivraisonShape = {
  id: '',
  statut: 'OPEN',
  details: null,
  ville: null,
  adresseLivraison: null,
  dateLivraison: null,
  commande: { id: '', client: { nom: '', prenom: '' } },
  commerceant: { id: '' },
  propositions: [],
  acceptedProposal: null,
};
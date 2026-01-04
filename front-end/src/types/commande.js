// Enum statut commande
export const CommandeStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

// Shapes indicatifs
export const CommandeShape = {
  id: '',
  createdAt: '',
  addressLivraison: '',
  dateLivraison: null,
  statut: CommandeStatus.PENDING,
  details: null,
  commerceant: { id: '', nom: '' },
  client: { id: '', nom: '', prenom: '' },
  rappelCommandes: [],
};

export const CreateCommandeDtoShape = {
  commerceantId: '',
  clientId: '',
  addressLivraison: '',
  dateLivraison: undefined, // string ISO optionnelle
  statut: undefined,        // CommandeStatus optionnel
  details: undefined,
};

export const UpdateCommandeDtoShape = {
  commerceantId: undefined,
  clientId: undefined,
  addressLivraison: undefined,
  dateLivraison: undefined,
  statut: undefined,
  details: undefined,
};
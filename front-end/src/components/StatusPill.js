import React from 'react';
import Badge from './Badge';

const statusTone = {
  PENDING: 'warning',
  IN_PROGRESS: 'default',
  COMPLETED: 'success',
  CANCELED: 'danger',
};

const StatusPill = ({ statut }) => (
  <Badge label={statut} tone={statusTone[statut] || 'default'} />
);

export default StatusPill;
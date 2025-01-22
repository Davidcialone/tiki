export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export const TABLE_ZONES = {
  INSIDE: 'INSIDE',
  TERRACE: 'TERRACE',
  HERB: 'HERB',
  GRAVEL: 'GRAVEL'
};

export const ROLES = {
  MANAGER: 'MANAGER',
  WORKER: 'WORKER'
};

export const USER_ROLES = ROLES; // Pour la compatibilité

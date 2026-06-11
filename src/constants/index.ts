export const APP_NAME = 'MicroBio';
export const APP_VERSION = '0.1.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: '/admin',
  CLIENTE: '/cliente',
  SERVICOS: '/servicos',
} as const;

export const TOKEN_KEYS = {
  ACCESS: import.meta.env.VITE_TOKEN_KEY ?? 'microbio_token',
  REFRESH: import.meta.env.VITE_REFRESH_TOKEN_KEY ?? 'microbio_refresh_token',
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1';

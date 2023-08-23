export const API_GATE_URL = process!.env!['API_GATE_URL'] as string;

export const API_PREFIX = '/api';
export const NOTES_API = '/notes';

export const GOOGLE_CLIENT_ID = process!.env!['GOOGLE_AUTH_CLIENT_ID'] as string;
export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

import { API_GATE_URL } from '@self-notes-frontend/utils';
import { Configuration } from '../../auth';

export function authConfigFactory(): Configuration {
  return new Configuration({
    basePath: API_GATE_URL,
    withCredentials: true,
  });
}

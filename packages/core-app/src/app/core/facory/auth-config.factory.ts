import { Configuration } from '../../auth';

export function authConfigFactory(): Configuration {
  return new Configuration({
    basePath: 'http://localhost:3000',
    withCredentials: true,
  });
}

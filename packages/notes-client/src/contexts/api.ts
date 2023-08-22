import { createContext } from 'react';
import { createCustomApi } from '../redux/services';

export const ApiContext = createContext<
  ReturnType<typeof createCustomApi> | undefined
>(undefined);

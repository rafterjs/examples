import { applySslConfig } from '../lib/utils/ConfigHelper';
import { IApiConfig } from './IApiConfig';

export const config: IApiConfig = {
  server: {
    port: process.env.API_SERVER_PORT ? parseInt(process.env.API_SERVER_PORT, 10) : 5000,
  },
  logger: {
    level: process.env.API_LOG_LEVEL || 'debug',
  },
  home: {
    message: 'Hi everyone :D',
  },
};

export default async (): Promise<IApiConfig> => {
  return applySslConfig(
    config,
    process.env.API_SERVER_SSL,
    process.env.API_SERVER_SSL_PRIVATE_KEY,
    process.env.API_SERVER_SSL_CERTIFICATE,
  );
};

import { IServerConfig } from '../lib/vendor';

export type IApiConfig = {
  server: {
    port?: number;
  };
  logger: {
    level: string;
  };
  home: {
    message: string;
  };
} & IServerConfig;

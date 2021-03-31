/* eslint-disable no-param-reassign */
import { IApiConfig } from '../../config/IApiConfig';

export async function applySslConfig(
  config: IApiConfig,
  isSsl: string | undefined,
  privateKey: string | undefined,
  certificate: string | undefined,
): Promise<IApiConfig> {
  const isSslEnabled = isSsl === 'true';

  if (isSslEnabled) {
    if (!privateKey) {
      throw new Error(`Please set the private key`);
    }
    if (!certificate) {
      throw new Error(`Please set the certificate`);
    }

    config.server.ssl = {
      enabled: true,
      privateKey,
      certificate,
    };
  } else {
    config.server.ssl = {
      enabled: false,
    };
  }

  return config;
}

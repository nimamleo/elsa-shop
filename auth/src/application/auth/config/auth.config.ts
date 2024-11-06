import { ConfigFactory, registerAs } from '@nestjs/config';

export interface IAuthConfig {
  debug: boolean;
}

export const AUTH_CONFIG_TOKEN = 'auth-config-token';

export const authConfig = registerAs<IAuthConfig, ConfigFactory<IAuthConfig>>(
  AUTH_CONFIG_TOKEN,
  () => {
    if (!process.env.APP_DEBUG) {
      throw new Error('APP_DEBUG not provided');
    }

    return {
      debug: Boolean(process.env.APP_DEBUG),
    };
  },
);

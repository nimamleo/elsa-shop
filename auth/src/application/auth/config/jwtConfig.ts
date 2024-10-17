import { ConfigFactory, registerAs } from '@nestjs/config';

export interface IJwtConfig {
  secret: string;
  expiresIn: number;
}

export const JWT_CONFIG_TOKEN = 'jwt-config-token';

export const jwtConfig = registerAs<IJwtConfig, ConfigFactory<IJwtConfig>>(
  JWT_CONFIG_TOKEN,
  () => {
    if (!process.env.JWT_AUTH_SECRET) {
      throw new Error('JWT_AUTH_SECRET not provided');
    }
    if (!process.env.JWT_AUTH_EXPIRE) {
      throw new Error('JWT_AUTH_EXPIRE not provided');
    }

    return {
      secret: process.env.JWT_AUTH_SECRET,
      expiresIn: Number(process.env.JWT_AUTH_EXPIRE),
    };
  },
);

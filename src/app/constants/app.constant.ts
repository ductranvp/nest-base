import { getNumber } from '../../common/shared/utils/common.util';

export const NodeEnv = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const AppEnv = {
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT,
  DB_URI: process.env.DB_URI,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY_IN_SECOND: process.env.JWT_EXPIRY_IN_SECOND,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  DEFAULT_CACHE_TTL: getNumber(process.env.DEFAULT_CACHE_TTL),
};

export const Language = {
  ENGLISH: 'en',
  VIETNAMESE: 'vi',
};

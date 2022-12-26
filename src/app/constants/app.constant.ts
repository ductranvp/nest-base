export const NodeEnv = {
  LOCAL: 'local',
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
};

export const Language = {
  ENGLISH: 'en',
  VIETNAMESE: 'vi',
};

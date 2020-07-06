import * as dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
  NODE_ENV: string;
  PORT: string | number;
  RAPIDAPI_KEY: string;
  URL: string;
  RAPIDAPI_HOST: string;
  userEmail: string;
  serviceEmail: string;
  googleClientId: string;
  googleClientSecret: string;
  googleRefreshToken: string;
  googleOauthRedirectUrl: string;
}

const config: IConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  URL: 'https://currency-converter5.p.rapidapi.com/currency/convert',
  RAPIDAPI_HOST: 'currency-converter5.p.rapidapi.com',
  userEmail: 'example@example.com',
  serviceEmail: process.env.GOOGLE_EMAIL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URL,
};

export const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default config;

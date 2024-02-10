import dotenv from "dotenv";

dotenv.config();

const Env = {
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  NODE_ENV: process.env.NODE_ENV,
  STRAVA_API_KEY: process.env.STRAVA_API_KEY,
  STRAVA_VERIFY_TOKEN: process.env.STRAVA_VERIFY_TOKEN,
  STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
  STRAVA_OAUTH_URL: process.env.STRAVA_OAUTH_URL,
  STRAVA_REDIRECT_URI: process.env.STRAVA_REDIRECT_URI,
};

export default Env;

import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  CORS_ALLOWED_ORIGINS: string | undefined;
  JWT_PRIVATE_KEY: string | undefined;
  NODE_ENV: string | undefined;
  SERVER_PORT: number | undefined;
  SERVER_HOST: string | undefined;
  DB_HOST: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  DB_PORT: number | undefined;
}

interface Config {
  CORS_ALLOWED_ORIGINS: string;
  JWT_PRIVATE_KEY: string;
  NODE_ENV: "development" | "production";
  SERVER_PORT: number;
  SERVER_HOST: string;
  DB_HOST?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_NAME?: string;
  DB_PORT?: number;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: process.env.SERVER_PORT
      ? Number(process.env.SERVER_PORT)
      : undefined,
    SERVER_HOST: process.env.SERVER_HOST,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    DB_HOST: process.env.DB_HOST ? process.env.DB_HOST : undefined,
    DB_USER: process.env.DB_USER ? process.env.DB_USER : undefined,
    DB_PASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : undefined,
    DB_NAME: process.env.DB_NAME ? process.env.DB_NAME : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSafeConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const safeConfig = getSafeConfig(config);

export default safeConfig;

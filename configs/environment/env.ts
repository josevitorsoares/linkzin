import { config } from "dotenv";
import { join } from "node:path";
import { z } from "zod";

const result = config({
  path: join(__dirname, "..", "..", ".env"),
});

if (result.error) {
  if (result.error.message === "ENOENT") {
    throw new Error("Missing .env file");
  }

  throw new Error(result.error.message);
}

const envSchema = z.object({
  API_URL: z.string().url(),
  COUNTER_OBJECT_ID: z.string(),
  DB_CONN_STRING: z.string(),
  DB_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3333),
});

const env = envSchema.parse(process.env, {
  errorMap: () => ({
    message: "Missing environment variables",
  }),
});

const { API_URL, DB_CONN_STRING, DB_NAME, COUNTER_OBJECT_ID, NODE_ENV, PORT } =
  env;

export { API_URL, COUNTER_OBJECT_ID, DB_CONN_STRING, DB_NAME, NODE_ENV, PORT };

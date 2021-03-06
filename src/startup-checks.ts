import { cleanEnv, makeValidator, num, port, str, url } from "envalid";
import ms from "ms";

/**
 * @see{@link([vercel/ms](https://github.com/vercel/ms))}
 */
const vercelMsValidator = makeValidator((x) => {
  if (!ms(x)) {
    throw new Error("bad time value");
  } else {
    return x;
  }
});

/* TODO: Update the list as environment variables change! */

const vitalEnvironmentVariables = {
  NODE_ENV: str(),
  MONGO_URI: url(),
  PORT: port(),
  JWT_AUTH_SECRET: str(),
  BCRYPT_SALT_GEN_ROUNDS: num(),
  JWT_EXPIRATION_TIME: vercelMsValidator() // Use value in seconds or format of https://github.com/vercel/ms
};

cleanEnv(process.env, vitalEnvironmentVariables);

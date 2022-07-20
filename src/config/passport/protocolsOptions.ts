import { ProtocolOptions } from "@tsed/passport";
import { Secret, SignOptions } from "jsonwebtoken";
import { ExtractJwt } from "passport-jwt";
import { IStrategyOptions } from "passport-local";

export type LocalProtocolConfig = {
  secretOrKey: Secret | string;
  signingOptions: SignOptions;
  settings: IStrategyOptions;
};

// Environment variables are validated "@startup-check.ts"
const {
  JWT_AUTH_SECRET: secretOrKey = "",
  JWT_EXPIRATION_TIME: expiresIn,
  JWT_ISSUER: issuer,
  JWT_AUDIENCE: audience
} = process.env;

const jwtLocalProtocolSettings: LocalProtocolConfig = {
  secretOrKey,
  signingOptions: {
    audience,
    issuer,
    expiresIn
  },
  settings: {
    session: false,
    usernameField: "email"
  }
};

// Passport strategies / Ts.ED Passport protocols
export default {
  signup: jwtLocalProtocolSettings,
  login: jwtLocalProtocolSettings,
  jwt: {
    settings: {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience,
      issuer,
      secretOrKey,
      jsonWebTokenOptions: {
        maxAge: expiresIn
      }
    }
  }
} as Partial<ProtocolOptions>;

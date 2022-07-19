import { ProtocolOptions } from "@tsed/passport";
import { Secret, SignOptions } from "jsonwebtoken";
import { ExtractJwt } from "passport-jwt";
import { IStrategyOptions } from "passport-local";

//TODO: get from environment variables! => Config
const secretOrKey = "thisismysupersecretprivatekey3";
const audience = "localhost";
const issuer = "localhost";
const expirationInSeconds = 3600;

const signingOptions: SignOptions = {
  audience,
  issuer,
  expiresIn: expirationInSeconds
};

export type LocalProtocolConfig = {
  secretOrKey: Secret | string;
  signingOptions: SignOptions;
  settings: IStrategyOptions;
};

export default {
  signup: {
    secretOrKey,
    signingOptions,
    settings: {
      session: false,
      usernameField: "email"
    }
  },
  login: {
    secretOrKey,
    signingOptions,
    settings: {
      session: false,
      usernameField: "email"
    }
  },
  jwt: {
    settings: {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience,
      issuer,
      secretOrKey,
      jsonWebTokenOptions: {
        maxAge: expirationInSeconds
      }
    }
  }
} as Partial<ProtocolOptions>;

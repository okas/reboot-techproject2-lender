import { readFileSync } from "fs";
import * as authorization from "./authorization";
import { envs } from "./envs/index";
import logger from "./logger/index";
import mongoose from "./mongoose/index";
import passport from "./passport/index";
import swagger from "./swagger/index";

const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger,
  mongoose,
  swagger,
  passport,
  authorization
};

import { readFileSync } from "fs";
import * as authorization from "./authorization";
import logger from "./logger/index";
import mongoose from "./mongoose/index";
import passport from "./passport/index";
import swagger from "./swagger";

const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  ...process.env,
  logger,
  mongoose,
  swagger,
  // @ts-expect-error Type mismatch of options property
  passport,
  authorization
};

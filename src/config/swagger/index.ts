import { SwaggerOS3Settings } from "@tsed/swagger";
import {
  author,
  description,
  displayName,
  license,
  version
} from "package.json";

export default [
  {
    path: "/doc",
    specVersion: "3.0.1",
    spec: {
      info: {
        title: `Documentation of ${displayName}`,
        version,
        license: { name: license },
        contact: author,
        description
      },
      components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer"
          }
        }
      }
    }
  }
] as SwaggerOS3Settings[];

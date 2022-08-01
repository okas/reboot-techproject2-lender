import { SwaggerOS3Settings } from "@tsed/swagger";
import { readFileSync } from "fs";

const { author, description, displayName, license, version } = JSON.parse(
  readFileSync("./package.json", { encoding: "utf8" })
);

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
            scheme: "bearer",
            description:
              "Provide token, scheme will be prepended automatically (double scheme will fail auth)"
          }
        }
      }
    },
    options: {
      docExpansion: "none",
      persistAuthorization: true,
      tryItOutEnabled: true,
      deepLinking: true,
      displayOperationId: true,
      displayRequestDuration: true,
      filter: "Auth",
      showExtensions: true,
      showCommonExtensions: true,
      requestSnippetsEnabled: true,
      queryConfigEnabled: true
    },
    showExplorer: true
  }
] as SwaggerOS3Settings[];

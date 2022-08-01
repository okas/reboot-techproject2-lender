import { SwaggerOS3Settings } from "@tsed/swagger";
import { readFileSync } from "fs";

const { author, description, displayName, license, version } = JSON.parse(
  readFileSync("./package.json", { encoding: "utf8" })
);

export default [
  {
    path: "/doc",
    specVersion: "3.0.3",
    spec: {
      info: {
        title: `Documentation of ${displayName}`,
        version,
        license: {
          name: license,
          url: "https://github.com/okas/reboot-techproject2-lender/blob/main/LICENSE"
        },
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
      queryConfigEnabled: true,
      validatorUrl: "https://validator.swagger.io/validator"
    },
    showExplorer: true
  }
] as SwaggerOS3Settings[];

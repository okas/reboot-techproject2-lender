import { SwaggerOS3Settings } from "@tsed/swagger";

export default [
  {
    path: "/doc",
    specVersion: "3.0.1",
    spec: {
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

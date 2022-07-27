import { toTitleCase } from "./stringHelpers";

export class OASDocs {
  constructor(public modelName: string) {}

  public static readonly STATUS_400_DESCR_VALIDATION =
    "In case of any incomplete input or input validation failure.";

  public static readonly STATUS_400_ID_MISMATCH = "`id` parameter and `dto.id` property mismatch.";

  public static readonly STATUS_401_DESCR =
    "Even missing `JWT` token in `Authorization` header or insufficient role for given endpoint.";

  getControllerDecr = (kind?: string) =>
    `\`${OASDocs.k(kind)}${toTitleCase(this.modelName)}s\` management.`;

  get404ForNonExisting = (action: string, kind?: string) =>
    `Not able to \`${action}\` a non-existing \`${OASDocs.k(kind)}${this.modelName}s\`.`;

  getNoDoc = (kind?: string) =>
    `\`${OASDocs.k(kind)}${toTitleCase(this.modelName)}\` document not found.`;

  getAllSummary = (kind?: string) =>
    `Retrieve all \`${OASDocs.k(kind)}${this.modelName}s\` (TO BE PAGINATED!).`;

  getGetParamId = (kind?: string) => `ID of \`${OASDocs.k(kind)}${this.modelName}s\` to retrieve.`;

  getDocId = (kind?: string) => `Retrieve \`${OASDocs.k(kind)}${this.modelName}\` by its ID.`;

  getPostSummary = (kind?: string) => `Store new \`${OASDocs.k(kind)}${this.modelName}s\`.`;

  getParamPostDtoDescr = (kind?: string) =>
    `DTO to store new \`${OASDocs.k(kind)}${this.modelName}s\`.`;

  getPost201StatusDescr = (kind?: string) =>
    `Stored \`${OASDocs.k(kind)}${this.modelName}s\` instance.`;

  getPutSummary = (kind?: string) => `Update \`${OASDocs.k(kind)}${this.modelName}s\`.`;

  getParamPutIdDescr = (kind?: string) =>
    `Id of \`${OASDocs.k(kind)}${this.modelName}s\` to update.`;

  getParamPutDtoDescr = (kind?: string) =>
    `DTO of updated \`${OASDocs.k(kind)}${this.modelName}s\`.`;

  getDeleteSummary = (kind?: string) => `Remove \`${OASDocs.k(kind)}${this.modelName}s\` by ID.`;

  private static k(kind?: string) {
    return kind ? `${kind} ` : "";
  }
}

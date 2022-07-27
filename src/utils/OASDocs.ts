import { toTitleCase } from "./stringHelpers";

export class OASDocs {
  constructor(public modelName: string) {}

  public static readonly STATUS_400_DESCR_VALIDATION =
    "In case of any incomplete input or input validation failure.";

  public static readonly STATUS_400_ID_MISMATCH = "`id` parameter and `dto.id` property mismatch.";

  public static readonly STATUS_401_DESCR =
    "Even missing `JWT` token in `Authorization` header or insufficient role for given endpoint.";

  getControllerDecr = (kind?: string) =>
    `\`${toTitleCase(OASDocs.prettified(this.modelName, kind))}\` management.`;

  get404ForNonExisting = (action: string, kind?: string) =>
    `Not able to \`${action}\` a non-existing \`${OASDocs.prettified(this.modelName, kind)}\`.`;

  getNoDoc = (kind?: string) =>
    `\`${toTitleCase(OASDocs.prettified(this.modelName, kind))}\` document not found.`;

  getAllSummary = (kind?: string) =>
    `Retrieve all \`${OASDocs.prettified(this.modelName, kind)}\`-s (TO BE PAGINATED!).`;

  getGetParamId = (kind?: string) =>
    `ID of \`${OASDocs.prettified(this.modelName, kind)}\` to retrieve.`;

  getDocId = (kind?: string) =>
    `Retrieve \`${OASDocs.prettified(this.modelName, kind)}\` by its ID.`;

  getPostSummary = (kind?: string) => `Store new \`${OASDocs.prettified(this.modelName, kind)}\`.`;

  getParamPostDtoDescr = (kind?: string) =>
    `DTO to store new \`${OASDocs.prettified(this.modelName, kind)}\`.`;

  getPost201StatusDescr = (kind?: string) =>
    `Stored \`${OASDocs.prettified(this.modelName, kind)}\` instance.`;

  getPutSummary = (kind?: string) => `Update \`${OASDocs.prettified(this.modelName, kind)}\`.`;

  getParamPutIdDescr = (kind?: string) =>
    `Id of \`${OASDocs.prettified(this.modelName, kind)}\` to update.`;

  getParamPutDtoDescr = (kind?: string) =>
    `DTO of updated \`${OASDocs.prettified(this.modelName, kind)}\`.`;

  getDeleteSummary = (kind?: string) =>
    `Remove \`${OASDocs.prettified(this.modelName, kind)}\` by ID.`;

  private static prettified(name: string, kind?: string) {
    return `${kind ? `${kind} ` : ""}${name}`;
  }
}

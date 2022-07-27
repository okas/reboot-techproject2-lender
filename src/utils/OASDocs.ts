import { toTitleCase } from "./stringHelpers";

export class OASDocs {
  constructor(public modelName: string) {}

  public static readonly STATUS_400_DESCR_VALIDATION =
    "In case of any incomplete input or input validation failure.";

  public static readonly STATUS_400_ID_MISMATCH = "`id` parameter and `dto.id` property mismatch.";

  getControllerDecr = () => `\`${toTitleCase(this.modelName)}s\` management.`;

  get404ForNonExisting = (action: string) =>
    `Not able to \`${action}\` non-existing \`${this.modelName}\`.`;

  getNoDoc = () => `\`${toTitleCase(this.modelName)}\` document not found.`;

  getAllSummary = () => `Retrieve all \`${this.modelName}s\` (TO BE PAGINATED!).`;

  getGetParamId = () => `ID of \`${toTitleCase(this.modelName)}\` to retrieve.`;

  getDocId = () => `Retrieve \`${this.modelName}\` by its ID.`;

  getPostSummary = () => `Store new \`${this.modelName}\`.`;

  getParamPostDtoDescr = () => `DTO to store new \`${this.modelName}\`.`;

  getPost201StatusDescr = () => `Stored \`${this.modelName}\` instance.`;

  getPutSummary = () => `Update \`${this.modelName}\`.`;

  getParamPutIdDescr = () => `Id of \`${this.modelName}\` to update.`;

  getParamPutDtoDescr = () => `DTO of updated \`${this.modelName}\`.`;

  getDeleteSummary = () => `Remove \`${this.modelName}\` by ID.`;
}

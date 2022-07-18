import { UserModel } from "@/models/UserModel";
import protocols from "./protocolsOptions";

export default {
  disableSession: true,
  userInfoModel: UserModel,
  protocols
} as Partial<TsED.Configuration>;

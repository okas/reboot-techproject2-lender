import { ContractModel } from "@/models/ContractModel";
import { DiscriminatorKey, Model, Ref } from "@tsed/mongoose";
import { Description, Ignore, Required } from "@tsed/schema";
import { CommonTransaction } from "./common/CommonTransaction";

@Model({ collection: "contract-transactions" })
export abstract class BaseContractTransactionModel extends CommonTransaction {
  @Description("Contract reference")
  @Required()
  @Ref(ContractModel)
  contract: Ref<ContractModel>;

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}

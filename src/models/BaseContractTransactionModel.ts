import { ContractModel } from "@/models/ContractModel";
import { DiscriminatorKey, Model, Ref } from "@tsed/mongoose";
import { Description, Ignore, Required } from "@tsed/schema";
import { BaseTransaction } from "./common/BaseTransaction";

@Model({ collection: "contract-transactions" })
export abstract class BaseContractTransactionModel extends BaseTransaction {
  @Description("Contract reference")
  @Required()
  @Ref(ContractModel)
  contract: Ref<ContractModel>;

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}

import { ContractModel } from "@/models/ContractModel";
import { Model, Ref } from "@tsed/mongoose";
import { Description, Required } from "@tsed/schema";
import { CommonTransaction } from "./common/CommonTransaction";

@Model({ collection: "contract-transactions" })
export abstract class BaseContractTransactionModel extends CommonTransaction {
  @Description("Contract reference")
  @Required()
  @Ref(ContractModel)
  contract: Ref<ContractModel>;
}

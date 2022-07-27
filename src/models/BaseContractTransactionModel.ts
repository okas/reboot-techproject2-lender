import { ContractModel } from "@/models/ContractModel";
import { Model, Ref } from "@tsed/mongoose";
import { Description, Required } from "@tsed/schema";
import { BaseTransaction } from "./Bases/BaseTransaction";

@Model({ collection: "contract-transactions" })
export abstract class BaseContractTransactionModel extends BaseTransaction {
  @Description("Contract reference")
  @Required()
  @Ref(ContractModel)
  contract: Ref<ContractModel>;
}

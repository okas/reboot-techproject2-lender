import { BaseId } from "@/models/Bases/BaseId";
import { Model, Ref, Trim } from "@tsed/mongoose";
import { Description, Example, MaxLength, Nullable, Required } from "@tsed/schema";
import { BasePenaltyModel } from "./BasePenaltyModel";
import { ContractModel } from "./ContractModel";

@Model({ name: "contract-violation" })
export class ContractViolationModel extends BaseId {
  @Description("Contract reference the current violation is for.")
  @Required()
  @Ref(ContractModel)
  contract: Ref<ContractModel>;

  @Description("Penalty or reason for given violation.")
  @Required()
  @Ref(BasePenaltyModel)
  penalty: Ref<BasePenaltyModel>;

  @Description("Comments")
  @Example("if there is something to say")
  @Required(false)
  @Nullable(String)
  @MaxLength(100)
  @Trim()
  comments?: string;
}

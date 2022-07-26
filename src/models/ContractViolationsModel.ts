import { BaseModel } from "@/models/BaseModel";
import { Model, MongooseSchemaTypes, Ref, Trim } from "@tsed/mongoose";
import { Description, Example, MaxLength, Nullable, Required } from "@tsed/schema";
import { ContractModel } from "./ContractModel";
import { BasePenaltyModel } from "./PenaltyModel";

@Model({ name: "contract-violation" })
export class ContractViolationsModel extends BaseModel {
  @Description("Contract reference the current violation is for.")
  @Required()
  @Ref(ContractModel)
  contract: Ref<ContractModel>;

  @Description("Penalty or reason for given violation.")
  @Required()
  @Ref(ContractModel, MongooseSchemaTypes.OBJECT_ID)
  penalty: Ref<BasePenaltyModel>;

  @Description("Comments")
  @Example("if there is something to say")
  @Required(false)
  @Nullable(String)
  @MaxLength(100)
  @Trim()
  comments?: string;
}

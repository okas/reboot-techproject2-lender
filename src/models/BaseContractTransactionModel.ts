import { ContractModel } from "@/models/ContractModel";
import { getISODateAddDays } from "@/utils/date-helpers";
import {
  Decimal128,
  DiscriminatorKey,
  Model,
  MongooseSchemaTypes,
  NumberDecimal,
  Ref,
  Trim
} from "@tsed/mongoose";
import {
  Default,
  Description,
  Example,
  Format,
  Ignore,
  JsonFormatTypes,
  MaxLength,
  Min,
  Nullable,
  Required
} from "@tsed/schema";
import { BaseModel } from "./BaseModel";

@Model({ collection: "contract-transactions" })
export abstract class BaseContractTransactionModel extends BaseModel {
  @Description("Date")
  @Example(getISODateAddDays())
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  date: Date;

  @Description("Contract reference")
  @Required()
  @Ref(ContractModel, {
    type: MongooseSchemaTypes.OBJECT_ID
  })
  contract: Ref<ContractModel>;

  @Description("Amount")
  @Example("50.0")
  @Required()
  @NumberDecimal()
  @Min(0, true)
  amount: Decimal128;

  @Description("Transaction fees (if applicable)")
  @Example("0.5")
  @Required(false)
  @NumberDecimal()
  @Nullable(Number)
  @Min(0)
  cost?: Decimal128;

  @Description("Comments")
  @Example("if there is something to say")
  @Required(false)
  @Nullable(String)
  @MaxLength(100)
  @Trim()
  comments?: string;

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}

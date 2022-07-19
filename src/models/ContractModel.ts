import { Decimal128, Model, NumberDecimal, Trim, Unique } from "@tsed/mongoose";
import {
  DateFormat,
  Default,
  Description,
  Enum,
  Example,
  Max,
  MaxLength,
  Min,
  MinLength,
  Property,
  Required
} from "@tsed/schema";
import { ContractStatusEnum } from "./ContractStatusEnum";
import { ModelBase } from "./ModelBase";

@Model({ name: "contract" })
export class ContractModel extends ModelBase {
  @Description("Borrower ID")
  @Example("Will be ObjectID if Accounts implemented")
  @Property()
  borrowerId: string;

  @Description("Account ID")
  @Example("Will be ObjectID if Accounts implemented")
  @Property()
  accountId: string;

  @Description("Borrower's personal ID")
  @Example("12345678901 ")
  @Required()
  @MinLength(2)
  @MaxLength(20)
  @Trim()
  borrowerPersonCode: string;

  @Description("Effective date")
  @Example("2022-01-01")
  @Required()
  @Default(Date.now)
  @DateFormat()
  effectiveDate: Date;

  @Description("Effective date")
  @Example("1.333")
  @Required()
  @NumberDecimal()
  @Max(2.0)
  @Min(0.001)
  delayCoef: Decimal128;

  @Description("Status")
  @Example(ContractStatusEnum.DRAFT)
  @Enum(ContractStatusEnum)
  @Default(ContractStatusEnum.DRAFT)
  status: ContractStatusEnum;

  @Description("Total loan sum")
  @Example("50")
  @Required()
  @NumberDecimal()
  @Min(1)
  totalAmount: Decimal128;

  @Description("Total interest sum")
  @Example("15")
  @Required()
  @NumberDecimal()
  @Min(1)
  totalInterest: Decimal128;

  // TODO: use save hooks, easy approach.
  @Description("Document name (gen on save hook)")
  @Example("2022-##-######-##")
  @Required()
  @MinLength(15)
  @MaxLength(20)
  @Unique()
  documentName: string;

  // Required() // TODO:
  // schedule: emb [PaymentModel]
}

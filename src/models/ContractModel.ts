import { AccountModel } from "@/models/AccountModel";
import { getISODateAddDays } from "@/utils/date-helpers";
import {
  Decimal128,
  Model,
  MongooseModel,
  NumberDecimal,
  PreHook,
  Ref,
  Trim,
  Unique
} from "@tsed/mongoose";
import {
  ArrayOf,
  Default,
  Description,
  Enum,
  Example,
  Format,
  Groups,
  JsonFormatTypes,
  Max,
  MaxLength,
  Min,
  MinLength,
  Property,
  Required
} from "@tsed/schema";
import { ContractStatusEnum } from "./ContractStatusEnum";
import { ModelBase } from "./ModelBase";
import { PaymentModel } from "./PaymentModel";

@Model({ name: "contract" })
export class ContractModel extends ModelBase {
  @Description("Borrower ID")
  @Example("Will be ObjectID if Accounts implemented")
  @Property()
  borrowerId: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;

  @Description("Borrower's personal ID")
  @Example("12345678901 ")
  @Required()
  @MinLength(2)
  @MaxLength(20)
  @Trim()
  borrowerPersonCode: string;

  @Description("Effective date")
  @Example(getISODateAddDays(0))
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  effectiveDate: Date;

  @Description(
    "Coeficiente of interest that is applicable in case of return problems. Used as multiplier of daily interest rate."
  )
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
  @Example("50.0")
  @Required()
  @NumberDecimal()
  @Min(1)
  totalAmount: Decimal128;

  @Description("Total interest sum")
  @Example("15.5")
  @Required()
  @NumberDecimal()
  @Min(1)
  totalInterest: Decimal128;

  @Groups("!creation")
  @Description("Document name (gen. on save hook, unique and text indexed)")
  @Example("2022-##-######-##")
  @Required(true, undefined)
  @MinLength(15)
  @MaxLength(20)
  @Unique()
  docName: string;

  // TODO: virtuals of totals and length of in days as integer!
  // TODO: Virtuals of various interest rates?

  // TODO: validate that earliest payment is at least 1 day latter than contract start
  // TODO: validate that no payments have same date
  @Description("Consists of 1+ Payments")
  @Required()
  @ArrayOf(PaymentModel).MinItems(1)
  @Default([])
  schedule: [PaymentModel];

  // TODO: save and update pre hook must ensure that sums are not wrong!
  @PreHook("save")
  static async preSave(contract: ContractModel) {
    // TODO: use transaction here?
    const model = contract.constructor as MongooseModel<ContractModel>;
    const { borrowerPersonCode } = contract;

    const part1 = new Date().getFullYear();

    const part2 = 1 + (await model.estimatedDocumentCount().exec());

    const part4 =
      1 + (await model.countDocuments({ borrowerPersonCode }).exec());

    contract.docName = `${part1}-${part2}-${borrowerPersonCode}-${part4}`;
  }
}

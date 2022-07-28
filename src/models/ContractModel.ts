import { ShapesEnum } from "@/common/ShapesEnum";
import { AccountModel } from "@/models/AccountModel";
import { getDayDiff, getISODateAddDays } from "@/utils/date-helpers";
import { Readonly } from "@tsed/core";
import {
  Decimal128,
  Immutable,
  Model,
  MongooseModel,
  NumberDecimal,
  ObjectID,
  PreHook,
  Ref,
  SchemaIgnore,
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
  ReadOnly,
  Required
} from "@tsed/schema";
import { HasId } from "./common/HasId";
import { ContractStatusEnum } from "./ContractStatusEnum";
import { PaymentModel } from "./PaymentModel";

@Model({ name: "contract" })
export class ContractModel extends HasId {
  @Groups(ShapesEnum.nCRE, ShapesEnum.nUPD)
  @Description("Borrower ID")
  @Immutable()
  @Readonly()
  @ObjectID()
  borrowerId: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;

  @Description("Borrower's personal ID")
  @Example("12345678901")
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
  @Required()
  @Enum(ContractStatusEnum)
  @Default(ContractStatusEnum.DRAFT)
  status: ContractStatusEnum;

  @Groups(ShapesEnum.nCRE)
  @Description("Document name (gen. on save hook, unique and text indexed)")
  @Example("2022-##-######-##")
  @Required(true, undefined)
  @MinLength(15)
  @MaxLength(20)
  @Unique()
  docName: string;

  // TODO: Virtuals of various interest rates?
  // TODO: validate that earliest payment is at least 1 day latter than contract start
  // TODO: validate that no payments have same date
  @Description("Consists of 1+ Payments")
  @Required()
  @ArrayOf(PaymentModel).MinItems(1)
  @Default([])
  schedule: [PaymentModel];

  @Groups(ShapesEnum.nCRE, ShapesEnum.nUPD)
  @Description("Total loan sum")
  @Example("50.0")
  @Min(1)
  @ReadOnly()
  @SchemaIgnore()
  get totalAmount(): number {
    return this.schedule.reduce((acc, { amount }) => acc + parseFloat(amount.toString()), 0);
  }
  // @ts-expect-error Author of Ts.ED: `use this if you have an error with the json-mapper (I haven't fixed that)`
  set totalAmount(_);

  @Groups(ShapesEnum.nCRE, ShapesEnum.nUPD)
  @Description("Total interest sum")
  @Example("15.5")
  @Min(0)
  @SchemaIgnore()
  get totalInterest(): number {
    return this.schedule.reduce((acc, { interest }) => acc + parseFloat(interest.toString()), 0);
  }
  // @ts-expect-error Author of Ts.ED: `use this if you have an error with the json-mapper (I haven't fixed that)`
  set totalInterest(_);

  @Groups(ShapesEnum.nCRE, ShapesEnum.nUPD)
  @Description("Total interest sum")
  @Example("15.5")
  @Min(0)
  @SchemaIgnore()
  get totalExtra(): number {
    return this.schedule.reduce(
      (acc, { extra: extras = 0 }) => acc + parseFloat(extras.toString()),
      0
    );
  }
  // @ts-expect-error Author of Ts.ED: `use this if you have an error with the json-mapper (I haven't fixed that)`
  set totalExtra(_);

  @Groups(ShapesEnum.nCRE, ShapesEnum.nUPD)
  @Description("Nominal period of contract in days")
  @Example("30")
  @Min(1)
  @SchemaIgnore()
  get nominalDays(): number {
    const maxDay = Math.max(...this.schedule.map(({ dueDate }) => dueDate.getTime()));

    return getDayDiff(maxDay, this.effectiveDate);
  }
  // @ts-expect-error Author of Ts.ED: `use this if you have an error with the json-mapper (I haven't fixed that)`
  set nominalDays(_);

  // TODO: save and update pre hook must ensure that sums are not wrong!
  @PreHook("save")
  static async preSave(contract: ContractModel) {
    // TODO: use transaction here?
    // TODO: use reliance on status "DRAFT => APPROVED" to compose final number!
    // Until then use some temporary convention.
    // Idea is to maintain clean serials of successful contracts.
    const model = contract.constructor as MongooseModel<ContractModel>;
    const { borrowerPersonCode } = contract;

    const part1 = new Date().getFullYear();

    const part2 = 1 + (await model.estimatedDocumentCount().exec());

    const part4 = 1 + (await model.countDocuments({ borrowerPersonCode }).exec());

    contract.docName = `${part1}-${part2}-${borrowerPersonCode}-${part4}`;
  }
}

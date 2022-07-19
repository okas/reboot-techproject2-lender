import { AccountModel } from "@/models/AccountModel";
import {
  Decimal128,
  Model,
  MongooseModel,
  NumberDecimal,
  PreHook,
  Ref,
  Text,
  Trim,
  Unique
} from "@tsed/mongoose";
import {
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
  @Example("2022-01-01")
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
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

  @Groups("!creation")
  @Description("Document name (gen. on save hook, unique and text indexed)")
  @Example("2022-##-######-##")
  @Required(true, undefined)
  @MinLength(15)
  @MaxLength(20)
  @Unique()
  @Text()
  docName: string;

  // TODO: virtuals of totals and length of in days as integer!

  // Required() // TODO:
  // schedule: emb [PaymentModel]

  @PreHook("save")
  static async preSave(contract: ContractModel) {
    const model = contract.constructor as MongooseModel<ContractModel>;

    const part1 = new Date().getFullYear();

    const part2 = 1 + (await model.estimatedDocumentCount().exec());

    const borrowerContracts = {
      borrowerPersonCode: contract.borrowerPersonCode
    };
    const part4 = 1 + (await model.countDocuments(borrowerContracts).exec());

    contract.docName = `${part1}-${part2}-${contract.borrowerPersonCode}-${part4}`;
  }
}

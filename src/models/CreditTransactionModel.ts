import { Model } from "@tsed/mongoose";
import { BaseContractTransactionModel } from "./BaseContractTransactionModel";

@Model({ discriminatorValue: "credit" })
export class CreditTransactionModel extends BaseContractTransactionModel {}

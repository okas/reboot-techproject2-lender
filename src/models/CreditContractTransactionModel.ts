import { Model } from "@tsed/mongoose";
import { BaseContractTransactionModel } from "./BaseContractTransactionModel";

@Model({ discriminatorValue: "credit" })
export class CreditContractTransactionModel extends BaseContractTransactionModel {}

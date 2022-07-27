import { Model } from "@tsed/mongoose";
import { BaseContractTransactionModel } from "./BaseContractTransactionModel";

@Model({ discriminatorValue: "debit" })
export class DebitContractTransactionModel extends BaseContractTransactionModel {}

import { Model } from "@tsed/mongoose";
import { BaseContractTransactionModel } from "./BaseContractTransactionModel";

@Model({ discriminatorValue: "debit-contract" })
export class DebitContractTransactionModel extends BaseContractTransactionModel {}

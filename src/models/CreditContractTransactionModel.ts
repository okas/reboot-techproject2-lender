import { Model } from "@tsed/mongoose";
import { BaseContractTransactionModel } from "./BaseContractTransactionModel";

@Model({ discriminatorValue: "credit-contract" })
export class CreditContractTransactionModel extends BaseContractTransactionModel {}

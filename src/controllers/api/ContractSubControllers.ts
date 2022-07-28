import { Controller } from "@tsed/di";
import { ContractTransactionsCreditController } from "./contracts/ContractTransactionsCreditController";
import { ContractTransactionsDebitController } from "./contracts/ContractTransactionsDebitController";
import { ContractViolationsController } from "./contracts/ContractViolationsController";

@Controller({
  path: "/contracts/:contractId",
  children: [
    ContractViolationsController,
    ContractTransactionsDebitController,
    ContractTransactionsCreditController
  ]
})
export class ContractSubControllers {}

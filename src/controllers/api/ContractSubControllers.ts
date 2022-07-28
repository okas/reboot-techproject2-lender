import { Controller } from "@tsed/di";
import { ContractTransactionsCreditController } from "./contract/ContractTransactionsCreditController";
import { ContractTransactionsDebitController } from "./contract/ContractTransactionsDebitController";
import { ContractViolationsController } from "./contract/ContractViolationsController";

@Controller({
  path: "/contracts/:contractId",
  children: [
    ContractViolationsController,
    ContractTransactionsDebitController,
    ContractTransactionsCreditController
  ]
})
export class ContractSubControllers {}

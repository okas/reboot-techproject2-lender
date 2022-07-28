import { Controller } from "@tsed/di";
import { TransactionsPortfolioCreditController } from "./transactions/TransactionsPortfolioCreditController";
import { TransactionsPortfolioDebitController } from "./transactions/TransactionsPortfolioDebitController";

@Controller({
  path: "/transactions",
  children: [TransactionsPortfolioCreditController, TransactionsPortfolioDebitController]
})
export class TransactionsController {}

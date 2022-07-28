import { Controller } from "@tsed/di";
import { PortfolioTransactionsCreditController } from "./portfolio/PortfolioTransactionsCreditController";
import { PortfolioTransactionsDebitController } from "./portfolio/PortfolioTransactionsDebitController";

@Controller({
  path: "/portfolio",
  children: [PortfolioTransactionsCreditController, PortfolioTransactionsDebitController]
})
export class PortfolioSubControllers {}

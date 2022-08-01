import { Controller } from "@tsed/di";
import { PortfolioCostsBorrowerController } from "./portfolio/PortfolioCostsBorrowerController";
import { PortfolioCostsOperationController } from "./portfolio/PortfolioCostsOperationController";
import { PortfolioTransactionsCreditController } from "./portfolio/PortfolioTransactionsCreditController";
import { PortfolioTransactionsDebitController } from "./portfolio/PortfolioTransactionsDebitController";

@Controller({
  path: "/portfolio",
  children: [
    PortfolioTransactionsCreditController,
    PortfolioTransactionsDebitController,
    PortfolioCostsBorrowerController,
    PortfolioCostsOperationController
  ]
})
export class PortfolioSubControllers {}

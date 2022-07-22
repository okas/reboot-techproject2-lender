import { ContractModel } from "@/models/ContractModel";
import { CreditTransactionModel } from "@/models/CreditTransactionModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseContractTransactionService } from "./BaseContractTransactionService`1";

@Service()
export class CreditTransactionService extends BaseContractTransactionService<CreditTransactionModel> {
  constructor(
    @Inject(CreditTransactionModel) transactRepo: MongooseModel<CreditTransactionModel>,
    @Inject(ContractModel) contractRepo: MongooseModel<ContractModel>
  ) {
    super(transactRepo, contractRepo);
  }
}

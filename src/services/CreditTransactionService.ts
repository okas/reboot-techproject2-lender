import { ContractModel } from "@/models/ContractModel";
import { CreditContractTransactionModel } from "@/models/CreditContractTransactionModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseContractTransactionService } from "./common/BaseContractTransactionService`1";

@Service()
export class CreditTransactionService extends BaseContractTransactionService<CreditContractTransactionModel> {
  constructor(
    @Inject(CreditContractTransactionModel)
    transactRepo: MongooseModel<CreditContractTransactionModel>,
    @Inject(ContractModel) contractRepo: MongooseModel<ContractModel>
  ) {
    super(transactRepo, contractRepo);
  }
}

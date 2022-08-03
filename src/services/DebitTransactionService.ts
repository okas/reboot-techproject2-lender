import { ContractModel } from "@/models/ContractModel";
import { DebitContractTransactionModel } from "@/models/DebitContractTransactionModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseContractTransactionService } from "./common/BaseContractTransactionService`1";

@Service()
export class DebitTransactionService extends BaseContractTransactionService<DebitContractTransactionModel> {
  constructor(
    @Inject(DebitContractTransactionModel)
    transactRepo: MongooseModel<DebitContractTransactionModel>,
    @Inject(ContractModel) contractRepo: MongooseModel<ContractModel>
  ) {
    super(transactRepo, contractRepo);
  }
}

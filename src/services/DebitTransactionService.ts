import { ContractModel } from "@/models/ContractModel";
import { DebitTransactionModel } from "@/models/DebitTransactionModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseContractTransactionService } from "./BaseContractTransactionService`1";

@Service()
export class DebitTransactionService extends BaseContractTransactionService<DebitTransactionModel> {
  constructor(
    @Inject(DebitTransactionModel) transactRepo: MongooseModel<DebitTransactionModel>,
    @Inject(ContractModel) contractRepo: MongooseModel<ContractModel>
  ) {
    super(transactRepo, contractRepo);
  }
}

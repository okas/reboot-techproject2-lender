import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { AccountModel } from "../models/AccountModel";
import { CRUDServiceBase } from "./CRUDServiceBase`1";

@Service()
export class AccountService extends CRUDServiceBase<AccountModel> {
  constructor(@Inject(AccountModel) model: MongooseModel<AccountModel>) {
    super(model);
  }
}

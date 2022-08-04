import { ContractModel } from "@/models/ContractModel";
import { UserModel } from "@/models/UserModel";
import { ValidationError } from "@tsed/common";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ok } from "assert";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class ContractService extends BaseCRUDService<ContractModel> {
  constructor(
    @Inject(ContractModel) contractModel: MongooseModel<ContractModel>,
    @Inject(UserModel) private userModel: MongooseModel<UserModel>
  ) {
    super(contractModel);
  }

  async getAllByClient(borrowerPersonCode: string) {
    const userDoc = await this.findAndAssertExists(borrowerPersonCode);

    return (await this.repo.find({ borrowerId: userDoc._id }).exec()).map((doc) => doc.toClass());
  }

  async getAllByClientById(borrowerPersonCode: string, _id: string) {
    const userDoc = await this.findAndAssertExists(borrowerPersonCode);

    return (await this.repo.findById({ borrowerId: userDoc._id, _id }).exec())?.toClass();
  }

  async create(dto: Partial<ContractModel>): Promise<ContractModel> {
    const userDoc = await this.getClientByOneOfPersonCodes(dto.borrowerPersonCode as string);

    ok(userDoc, new ValidationError("Cannot create contract: unknown borrower"));

    dto.borrowerId = userDoc._id;

    return super.create(dto);
  }

  private async findAndAssertExists(borrowerPersonCode: string): Promise<UserModel> {
    const userDoc = await this.getClientByOneOfPersonCodes(borrowerPersonCode);

    ok(userDoc, new ValidationError("Cannot find contract: unknown client"));

    return userDoc;
  }

  private async getClientByOneOfPersonCodes(borrowerPersonCode: string) {
    return (
      await this.userModel
        .findOne({
          $or: [{ personCode1: borrowerPersonCode }, { personCode2: borrowerPersonCode }]
        })
        .select({ _id: true })
        .exec()
    )?.toClass();
  }
}

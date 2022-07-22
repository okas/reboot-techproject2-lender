import { ContractModel } from "@/models/ContractModel";
import { UserModel } from "@/models/UserModel";
import { Inject, Service } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.repository.find({ borrowerId: userDoc!._id }).exec()).map((doc) =>
      doc.toClass()
    );
  }

  async getAllByClientById(borrowerPersonCode: string, _id: string) {
    const userDoc = await this.findAndAssertExists(borrowerPersonCode);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.repository.findById({ borrowerId: userDoc!._id, _id }).exec())?.toClass();
  }

  async create(dto: ContractModel): Promise<ContractModel> {
    const userDoc = await this.getClientByOneOfPersonCodes(dto.borrowerPersonCode);

    this.assertClientFound(userDoc, "Cannot create contract: unknown borrower");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dto.borrowerId = userDoc!._id;

    return super.create(dto);
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

  private assertClientFound(doc: UserModel | undefined | null, errMessage: string) {
    if (!doc?._id) {
      throw new NotFound(errMessage);
    }
  }

  private async findAndAssertExists(borrowerPersonCode: string) {
    const userDoc = await this.getClientByOneOfPersonCodes(borrowerPersonCode);

    this.assertClientFound(userDoc, "Cannot find contract: unknown client");
    return userDoc;
  }
}

import { UserModel } from "@/models/UserModel";
import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";

@Injectable()
export class UsersService {
  constructor(@Inject(UserModel) private repo: MongooseModel<UserModel>) {}

  async findId(_id: string): Promise<UserModel | undefined> {
    return (await this.repo.findById(_id).exec())?.toClass();
  }

  async findOne(query: Partial<UserModel>): Promise<UserModel | undefined> {
    return (await this.repo.findOne(query).exec())?.toClass();
  }

  async findForAuth(email: string): Promise<UserModel | undefined> {
    return (
      await this.repo.findOne({ email }).select({ email: true, password: true, roles: true }).exec()
    )?.toClass();
  }

  async findSome(query: Partial<UserModel>): Promise<UserModel[]> {
    return (await this.repo.find(query).exec())?.map((doc) => doc.toClass());
  }

  async create(user: UserModel): Promise<UserModel> {
    return (await this.repo.create(user)).toClass();
  }
}

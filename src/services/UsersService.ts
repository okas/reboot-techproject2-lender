import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { UserModel } from "@/models/UserModel";

@Injectable()
export class UsersService {
  constructor(@Inject(UserModel) private repo: MongooseModel<UserModel>) {}

  async findId(_id: string) {
    return (await this.repo.findById(_id).lean().exec())?.toClass();
  }

  async findOne(query: Partial<UserModel>) {
    return (await this.repo.findOne(query).lean().exec())?.toClass();
  }

  async findSome(query: Partial<UserModel>) {
    return (await this.repo.find(query).lean().exec())?.map((doc) =>
      doc.toClass()
    );
  }

  async create(user: UserModel) {
    return (await this.repo.create(user)).toClass();
  }
}

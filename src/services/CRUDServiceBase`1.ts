import { ModelBase } from "@/models/ModelBase";
import { MongooseModel } from "@tsed/mongoose";

export abstract class CRUDServiceBase<TModel extends ModelBase> {
  constructor(protected repository: MongooseModel<TModel>) {}

  async getAll() {
    return (await this.repository.find().exec()).map((m) => m.toClass());
  }

  async find(_id: string) {
    return (await this.repository.findById(_id).exec())?.toClass();
  }

  async create(dto: unknown) {
    return (await this.repository.create(dto)).toClass();
  }

  /**
   * @returns Matched count.
   */
  async update({ _id, ...rest }: TModel) {
    return (await this.repository.updateOne({ _id }, rest)).matchedCount;
  }

  /**
   * @returns Deleted count.
   */
  async remove(_id: string) {
    return (await this.repository.deleteOne({ _id })).deletedCount;
  }
}

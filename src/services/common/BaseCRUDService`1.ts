import { BaseHasId } from "@/models/common/BaseHasId";
import { MongooseModel } from "@tsed/mongoose";

// Keep in mind that various mongoose hooks might be revised
// in case mongoose's data manipulation methods usage get changed.

export abstract class BaseCRUDService<TModel extends BaseHasId> {
  constructor(protected repo: MongooseModel<TModel>) {}

  async getAll(): Promise<TModel[]> {
    return (await this.repo.find().exec()).map((m) => m.toClass());
  }

  async findById(_id: string): Promise<TModel | undefined> {
    return (await this.repo.findById(_id).exec())?.toClass();
  }

  /**
   * @returns New and complete document instance.
   */
  async create(dto: Partial<TModel>): Promise<TModel> {
    return (await this.repo.create(dto)).toClass();
  }

  /**
   * @returns Matched count.
   */
  async update(dto: Partial<TModel>): Promise<number> {
    return (await this.repo.updateOne({ _id: dto._id }, dto)).matchedCount;
  }

  /**
   * @returns Deleted count.
   */
  async remove(_id: string): Promise<number> {
    return (await this.repo.deleteOne({ _id })).deletedCount;
  }
}

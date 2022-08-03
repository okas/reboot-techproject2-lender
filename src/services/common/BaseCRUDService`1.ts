import { HasId } from "@/models/common/HasId";
import { MongooseModel } from "@tsed/mongoose";

// Keep in mind that various mongoose hooks might be revised
// in case mongoose's data manipulation methods usage get changed.

export abstract class BaseCRUDService<TModel extends HasId> {
  constructor(protected repository: MongooseModel<TModel>) {}

  async getAll(): Promise<TModel[]> {
    return (await this.repository.find().exec()).map((m) => m.toClass());
  }

  async findById(_id: string): Promise<TModel | undefined> {
    return (await this.repository.findById(_id).exec())?.toClass();
  }

  /**
   * @returns New and complete document instance.
   */
  async create(dto: Partial<TModel>): Promise<TModel> {
    return (await this.repository.create(dto)).toClass();
  }

  /**
   * @returns Matched count.
   */
  async update(dto: Partial<TModel>): Promise<number> {
    return (await this.repository.updateOne({ _id: dto._id }, dto)).matchedCount;
  }

  /**
   * @returns Deleted count.
   */
  async remove(_id: string): Promise<number> {
    return (await this.repository.deleteOne({ _id })).deletedCount;
  }
}

import { BaseModel } from "@/models/BaseModel";
import { MongooseModel } from "@tsed/mongoose";

export abstract class BaseCRUDService<TModel extends BaseModel> {
  constructor(protected repository: MongooseModel<TModel>) {}

  async getAll(): Promise<TModel[]> {
    return (await this.repository.find().exec()).map((m) => m.toClass());
  }

  async findById(_id: string): Promise<TModel | undefined> {
    return (await this.repository.findById(_id).exec())?.toClass();
  }

  async create(dto: unknown): Promise<TModel> {
    return (await this.repository.create(dto)).toClass();
  }

  /**
   * @returns Matched count.
   */
  async update(dto: TModel): Promise<number> {
    return (await this.repository.updateOne({ _id: dto._id }, dto)).matchedCount;
  }

  /**
   * @returns Deleted count.
   */
  async remove(_id: string): Promise<number> {
    return (await this.repository.deleteOne({ _id })).deletedCount;
  }
}

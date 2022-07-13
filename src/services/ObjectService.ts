import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { NewObjectDTO } from "src/dtos/NewObjectDTO";
import { ObjectModel } from "src/models/ObjectModel";

@Service()
export class ObjectService {
  constructor(@Inject(ObjectModel) private model: MongooseModel<ObjectModel>) {}

  async getAll() {
    return (await this.model.find().lean()) as ObjectModel;
  }

  async find(_id: string) {
    return (await this.model.findById(_id).lean()) as ObjectModel;
  }

  async create(dto: NewObjectDTO) {
    return (await this.model.create(dto)) as ObjectModel;
  }

  /**
   * @returns Matched count.
   */
  async update({ _id, ...rest }: ObjectModel) {
    return (await this.model.updateOne({ _id }, rest)).matchedCount;
  }

  /**
   * @returns Deleted count.
   */
  async remove(_id: string) {
    return (await this.model.deleteOne({ _id })).deletedCount;
  }
}

import { ContractViolationModel } from "@/models/ContractViolationModel";
import { Module } from "@tsed/di";
import { getSchema, MongooseService } from "@tsed/mongoose";
import mongooseIdValidator from "mongoose-id-validator";

@Module()
export class MongooseRefValidator {
  constructor(private mongooseService: MongooseService) {}

  $onInit() {
    getSchema(ContractViolationModel).plugin(mongooseIdValidator, {
      connection: this.mongooseService.get()
    });
  }
}

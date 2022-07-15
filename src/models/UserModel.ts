import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { Model, MongooseNextCB, ObjectID, PreHook } from "@tsed/mongoose";
import { Description, Example, Groups, Ignore, Required } from "@tsed/schema";
import bcrypt from "bcrypt";

@Model({ name: "user" })
export class UserModel extends CredentialsDTO {
  @Groups("!creation")
  @ObjectID("id")
  _id: string;

  @Description("First name(s)")
  @Example("Okas Paco")
  @Required()
  firstNames: string;

  @Description("Last name(s)")
  @Example("Roos Gonzales")
  @Required()
  lastNames: string;

  @Description("Mobile phone number")
  @Example("### ## ## ##")
  phoneMobile: string;

  @Description("Country code of mobile phone number")
  @Example("###")
  ccPhoneMobile: string;

  // @Description("User address")
  // @Example("Street, house, etc, town")
  // @Required()
  // addressLine1: string;

  // @Description("User address")
  // addressLine2: string;

  // @Description("Postal code")
  // @Example("000000")
  // @Required()
  // postalCode: string;

  @Ignore((_, ctx) => ctx.mongoose)
  @Groups("auth")
  jwt: string;

  // or Prehook on static method
  @PreHook("save")
  static async preSave(user: UserModel, next: MongooseNextCB) {
    user.password = await bcrypt.hash(user.password, 10); //TODO: get from environment variables! => Config

    next();
  }

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

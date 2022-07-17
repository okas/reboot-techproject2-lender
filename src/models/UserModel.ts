import { RolesEnum } from "@/config/authorization";
import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { Model, ObjectID, PostHook, PreHook, Unique } from "@tsed/mongoose";
import {
  ArrayOf,
  Default,
  Description,
  Enum,
  Example,
  Groups,
  Required,
  UniqueItems
} from "@tsed/schema";
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
  @Example("111 22 33 44")
  @Required()
  @Unique()
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

  @Groups("!creation")
  @Description("Roles, will be used for authorization")
  @Example([RolesEnum.DEFAULT])
  @Enum(RolesEnum)
  @UniqueItems()
  @Default([])
  roles: RolesEnum[];

  @PreHook("save")
  static async preSave(user: UserModel) {
    if (!user.password?.trim()) {
      return;
    }

    user.password = await bcrypt.hash(user.password, 10); //TODO: get from environment variables! => Config
  }

  @PostHook("save", {})
  static async postSave(user: UserModel) {
    user.password = "";
  }

  async verifyPassword(password: string | undefined | null) {
    if (!this.password?.trim() || !password?.trim()) {
      return false;
    }

    const result = await bcrypt.compare(password, this.password);
    this.password = "";

    return result;
  }
}

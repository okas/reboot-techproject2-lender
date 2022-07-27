import { RolesEnum } from "@/common/RolesEnum";
import { ShapesEnum } from "@/common/ShapesEnum";
import { CredentialsModel } from "@/models/CredentialsModel";
import { Model, ObjectID, PostHook, PreHook, Sparse, Trim, Unique } from "@tsed/mongoose";
import {
  Default,
  Description,
  Enum,
  Example,
  Format,
  Groups,
  JsonFormatTypes,
  MaxLength,
  MinLength,
  Nullable,
  Required,
  UniqueItems,
  Uri
} from "@tsed/schema";
import bcrypt from "bcrypt";

@Model({ name: "user" })
export class UserModel extends CredentialsModel {
  @Groups(ShapesEnum.nCRE)
  @ObjectID("id")
  _id: string;

  @Groups(ShapesEnum.nCRE)
  @Description("Roles, will be used for authorization")
  @Example([RolesEnum.DEFAULT])
  @Enum(RolesEnum)
  @UniqueItems()
  @Default([])
  roles: RolesEnum[];

  @Description("First name(s)")
  @Example("Roy John")
  @Required()
  @MinLength(2)
  @MaxLength(50)
  @Trim()
  firstNames: string;

  @Description("Last name(s)")
  @Example("Smith Doe")
  @Required()
  @MinLength(2)
  @MaxLength(50)
  @Trim()
  lastNames: string;

  @Description("Personal ID")
  @Example("12345678901")
  @Required()
  @MinLength(2)
  @MaxLength(20)
  @Unique()
  @Trim()
  personCode1: string;

  @Description("Personal ID's country (ISO3166:alpha-3)")
  @Example("EST")
  @Required()
  @MinLength(3)
  @MaxLength(3)
  @Trim()
  ccPersonCode1: string;

  @Description("Personal ID, secondary")
  @Example("Y-1234567-P")
  @Required(false, undefined)
  @MinLength(2)
  @MaxLength(20)
  @Unique()
  @Sparse()
  @Trim()
  personCode2?: string;

  @Description("Personal ID's country, secondary (ISO3166:alpha-3)")
  @Example("ESP")
  @Required(false)
  @MinLength(3)
  @MaxLength(3)
  @Trim()
  ccPersonCode2?: string;

  @Description("Birthday (ISO 8601), be at least 18 y.o.")
  @Example("2000-01-01")
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  @Unique()
  @Trim()
  dateOfBirth: Date;

  @Description("Mobile phone number")
  @Example("111 22 33 44")
  @Required()
  @MinLength(7)
  @MaxLength(15)
  @Unique()
  @Trim() // TODO: Also apply hoop to remove spaces!
  phoneMobile: string;

  @Description("Country code of mobile phone number")
  @Example("###")
  @Required()
  @MinLength(1)
  @MaxLength(3)
  @Trim()
  ccPhoneMobile: string;

  @Description("Address line 1")
  @Example("Street, house, etc, town")
  @Required()
  @MinLength(4)
  @MaxLength(70)
  @Trim()
  addressLine1: string;

  @Description("Address line 2")
  @MinLength(4)
  @MaxLength(70)
  @Trim()
  addressLine2?: string;

  @Description("Postal code")
  @Example("000000")
  @Required()
  @MinLength(2)
  @MaxLength(12)
  @Trim()
  postalCode: string;

  @Description("Country (ISO3166:alpha-3)")
  @Example("ENG")
  @Required()
  @MinLength(3)
  @MaxLength(3)
  @Trim()
  country: string;

  @Description("Facebook profile URL")
  @Example("https://www.facebook.com/fb.user.name")
  @Required(false)
  @Uri()
  @Trim()
  @Unique()
  profileFb?: string;

  @Description("IBAN")
  @Example("DE91100000000123456789")
  @Required(true)
  @MinLength(16)
  @MaxLength(24)
  @Trim()
  @Unique()
  iban: string;

  @Description("Name of IBAN's owner (if other person)")
  @Example("Francisco José Lopez Garcia ")
  @Required(false)
  @MinLength(5)
  @MaxLength(100)
  @Trim()
  ibanOwnerName?: string;

  @Description("Personal ID of IBAN's owner (if other person)")
  @Example("7654321-U")
  @Required(false)
  @MinLength(2)
  @MaxLength(20)
  @Trim()
  ibanOwnerPersonCode?: string;

  @Description("Personal ID's country of IBAN's owner (if other person) (ISO3166:alpha-3)")
  @Example("ESP")
  @Required(false)
  @MinLength(3)
  @MaxLength(3)
  @Unique()
  @Sparse()
  @Trim()
  ccIbanOwnerPersonCode?: string;

  @Description("Relation with of IBAN's owner (if other person)")
  @Example("daughter")
  @Required(false)
  @MinLength(2)
  @MaxLength(20)
  @Trim()
  ibanOwnerRelation?: string;

  @Description("Comments")
  @Required(false)
  @Nullable(String)
  @MaxLength(200)
  @Trim()
  comments?: string;

  @PreHook("save")
  static async preSave(user: UserModel) {
    if (!user.password?.trim()) {
      return;
    }

    user.password = await bcrypt.hash(
      user.password,
      //TODO: Inject from @tsed config somehow
      Number(process.env.BCRYPT_SALT_GEN_ROUNDS)
    );
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

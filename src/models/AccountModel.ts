import { Model, Trim, Unique } from "@tsed/mongoose";
import {
  Description,
  Example,
  MaxLength,
  MinLength,
  Required
} from "@tsed/schema";
import { ModelBase } from "./ModelBase";

@Model({ name: "account" })
@Description("Account belong to lender.")
export class AccountModel extends ModelBase {
  @Description("Account name, unique identificator.")
  @Example("My investments account")
  @Required()
  @MinLength(2)
  @MaxLength(50)
  @Trim()
  @Unique()
  name: string;

  @Description("Account name.")
  @Example("Okas Roos")
  @Required()
  @MinLength(2)
  @MaxLength(50)
  @Trim()
  ownerName: string;

  @Description("IBAN")
  @Example("DE91109123000123456789")
  @Required(false)
  @MinLength(16)
  @MaxLength(24)
  @Trim()
  @Unique()
  iban: string;
}

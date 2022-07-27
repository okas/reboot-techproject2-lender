import { ShapesEnum } from "@/common/ShapesEnum";
import { Lowercase, Select, Trim, Unique } from "@tsed/mongoose";
import { Description, Email, Example, Groups, Required } from "@tsed/schema";

export class CredentialsModel {
  @Description("Email address")
  @Example("user@domain.com")
  @Email()
  @Required()
  @Unique()
  @Trim()
  @Lowercase()
  email: string;

  @Description("Set password")
  @Example("yoursecurepassword")
  @Required(true, undefined)
  @Groups(ShapesEnum.CRE)
  @Select(false)
  password: string;
}

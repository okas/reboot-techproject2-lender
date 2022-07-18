import { Lowercase, Select, Trim, Unique } from "@tsed/mongoose";
import { Description, Email, Example, Groups, Required } from "@tsed/schema";

export class CredentialsDTO {
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
  @Groups("creation")
  @Select(false)
  password: string;
}

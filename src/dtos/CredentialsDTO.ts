import { Select, Unique } from "@tsed/mongoose";
import { Description, Email, Example, Groups, Required } from "@tsed/schema";

export class CredentialsDTO {
  @Description("Email address")
  @Example("user@domain.com")
  @Email()
  @Required()
  @Unique()
  email: string;

  @Description("Set password")
  @Example("yoursecurepassword")
  @Required()
  @Groups("creation")
  @Select(false)
  password: string | null | undefined;
}

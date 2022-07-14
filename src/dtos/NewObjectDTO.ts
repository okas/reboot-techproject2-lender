import { Description, Required, Integer } from "@tsed/schema";

@Description("Separate DTO, protects from over posting.")
export class NewObjectDTO {
  @Description("It is a name property.")
  @Required()
  name: string;

  @Description("It is a count property.")
  @Required()
  @Integer()
  count: number;
}

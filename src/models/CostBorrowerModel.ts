import { ShapesEnum } from "@/common/ShapesEnum";
import { Model, Ref, SchemaIgnore } from "@tsed/mongoose";
import { Description, Example, Groups, Nullable, Required } from "@tsed/schema";
import { BaseCostModel } from "./BaseCostModel";
import { UserModel } from "./UserModel";

@Model({ discriminatorValue: "borrower-cost" })
export class CostBorrowerModel extends BaseCostModel {
  @Description("Borrower reference")
  @Required()
  @Ref(UserModel)
  borrower: Ref<UserModel>;

  @Groups(ShapesEnum.nCRE, ShapesEnum.nUPD)
  @Description("Full name of borrower")
  @Example("Pedro Manuel Lopez Garcia ")
  @Nullable(String)
  @SchemaIgnore()
  get fullName(): string | null | undefined {
    if (!(this.borrower instanceof UserModel)) {
      return undefined;
    }

    return `${this.borrower.firstNames} ${this.borrower.lastNames}`;
  }
  // @ts-expect-error Author of Ts.ED: `use this if you have an error with the json-mapper (I haven't fixed that)`
  set fullName(_);
}

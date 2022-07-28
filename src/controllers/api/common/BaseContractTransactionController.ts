import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { BadRequest } from "@tsed/exceptions";
import { BaseController } from "./BaseController";

export abstract class BaseContractTransactionController extends BaseController {
  protected assertContractIdEquals<TModel extends BaseContractTransactionModel>(
    contractId: string,
    { contract }: TModel
  ) {
    if (contractId !== contract) {
      throw new BadRequest("Contract id mismatch.");
    }
  }

  protected assertPutFixIfPossible<TModel extends BaseContractTransactionModel>(
    contractId: string,
    id: string,
    dto: TModel
  ) {
    this.assertContractIdEquals(contractId, dto);

    BaseController.assertPutFixIfPossible(id, dto);
  }
}

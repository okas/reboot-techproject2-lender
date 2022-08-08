import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { BaseController } from "./BaseController";
import { assertContractIdEquals } from "./contract-path-helpers";

export abstract class BaseContractTransactionController extends BaseController {
  protected assertPutFixIfPossible<TModel extends BaseContractTransactionModel>(
    contractId: string,
    id: string,
    dto: TModel
  ) {
    assertContractIdEquals(contractId, dto);

    BaseController.assertPutFixIfPossible(id, dto);
  }
}

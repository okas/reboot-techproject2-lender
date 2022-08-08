import { BadRequest } from "@tsed/exceptions";

export function assertContractIdEquals<TModel extends { contract: unknown }>(
  contractId: string,
  { contract }: TModel
) {
  if (contractId !== contract) {
    throw new BadRequest("Contract id mismatch.");
  }
}

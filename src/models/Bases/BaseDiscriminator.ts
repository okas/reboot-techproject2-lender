import { DiscriminatorKey } from "@tsed/mongoose";
import { Ignore } from "@tsed/schema";
import { BaseId } from "./BaseId";

/**
 * @augments BaseId
 * {@link BaseId}
 * @classdesc Common base with only `__t` that is discriminator property.
 */

export abstract class BaseDiscriminator extends BaseId {
  @Ignore()
  @DiscriminatorKey()
  __t: string;
}

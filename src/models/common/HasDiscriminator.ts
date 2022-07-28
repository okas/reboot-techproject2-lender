import { DiscriminatorKey } from "@tsed/mongoose";
import { Ignore } from "@tsed/schema";
import { HasId } from "./HasId";

/**
 * @augments HasId
 * {@link HasId}
 * @classdesc Common base with only `__t` that is discriminator property.
 */

export abstract class HasDiscriminator extends HasId {
  @Ignore()
  @DiscriminatorKey()
  __t: string;
}

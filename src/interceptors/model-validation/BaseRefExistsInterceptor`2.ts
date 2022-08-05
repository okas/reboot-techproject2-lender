import { BaseHasId } from "@/models/common/BaseHasId";
import { ValidationError } from "@tsed/common";
import { InterceptorContext, InterceptorMethods, InterceptorNext } from "@tsed/di";
import { InternalServerError } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { ok } from "node:assert/strict";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

export abstract class BaseRefExistsInterceptor<
  TModel extends BaseHasId,
  TOptions extends ExistenceInterceptorOpts
> implements InterceptorMethods
{
  private static readonly MSG_PART1 = "Interceptor error:";

  constructor(private repo: MongooseModel<TModel>) {}

  async intercept(
    context: InterceptorContext<unknown, TOptions>,
    next: InterceptorNext
  ): Promise<void> {
    const _id = BaseRefExistsInterceptor.tryGetIdOrThrow(context);

    ok(
      await this.repo.countDocuments({ _id }).exec(),
      new ValidationError(this.getErrorMessage(context.options?.action ?? context.propertyKey))
    );

    return next();
  }

  /**
   * Can be overriden in concrete classes to customize message.
   */
  getErrorMessage = (action?: string): string =>
    `Cannot ${action}: unknown ${this.repo.modelName} reference.`;

  private static tryGetIdOrThrow({
    args,
    options,
    propertyKey
  }: InterceptorContext<unknown, ExistenceInterceptorOpts>) {
    if (!args.length) {
      throw new InternalServerError(
        `${BaseRefExistsInterceptor.MSG_PART1} method "${propertyKey}." do not have arguments to work with.`
      );
    }

    if (!options?.key) {
      throw new InternalServerError(
        `${BaseRefExistsInterceptor.MSG_PART1} "options" missing or erroneous.`
      );
    }

    const paramOrder = options.paramOrder ?? 0;

    if (paramOrder >= args.length) {
      throw new InternalServerError(
        `${BaseRefExistsInterceptor.MSG_PART1} parameter order "${paramOrder}" is out of bound for method "${propertyKey}".`
      );
    }

    const id: string | undefined = args[paramOrder]?.[options.key]?.toString();

    if (!id) {
      throw new InternalServerError(
        `${BaseRefExistsInterceptor.MSG_PART1} cannot get value from "${paramOrder}." parameter's object, using key "${options.key}".`
      );
    }

    return id;
  }
}

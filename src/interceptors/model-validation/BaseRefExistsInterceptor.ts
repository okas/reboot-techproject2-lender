import { BaseHasId } from "@/models/common/BaseHasId";
import { ValidationError } from "@tsed/common";
import { InterceptorContext, InterceptorMethods, InterceptorNext } from "@tsed/di";
import { InternalServerError } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

const MSG_PART1 = "Interceptor error:";

export abstract class BaseRefExistsInterceptor<
  TModel extends BaseHasId,
  TOptions extends ExistenceInterceptorOpts
> implements InterceptorMethods
{
  constructor(private repo: MongooseModel<TModel>) {}

  abstract getErrorMessage(action: string): string;

  async intercept(
    context: InterceptorContext<unknown, TOptions>,
    next: InterceptorNext
  ): Promise<void> {
    const id = BaseRefExistsInterceptor.tryGetIdOrThrow(context);

    await this.tryVerifyAccountOrThrow(id, context.options?.action ?? context.propertyKey);

    return next();
  }

  private async tryVerifyAccountOrThrow(_id: string, action: string) {
    if (await this.repo.countDocuments({ _id }).exec()) {
      return;
    }

    throw new ValidationError(this.getErrorMessage(action));
  }

  private static tryGetIdOrThrow({
    args,
    options,
    propertyKey
  }: InterceptorContext<unknown, ExistenceInterceptorOpts>) {
    if (!args.length) {
      throw new InternalServerError(
        `${MSG_PART1} method "${propertyKey}." do not have arguments to work with.`
      );
    }

    if (!options?.key) {
      throw new InternalServerError(`${MSG_PART1} "options" missing or erroneous.`);
    }

    const paramOrder = options.paramOrder ?? 0;

    if (paramOrder >= args.length) {
      throw new InternalServerError(
        `${MSG_PART1} parameter order "${paramOrder}" is out of bound for method "${propertyKey}".`
      );
    }

    const id: string | undefined = args[paramOrder]?.[options.key]?.toString();

    if (!id) {
      throw new InternalServerError(
        `${MSG_PART1} cannot get value from "${paramOrder}." parameter's object, using key "${options.key}".`
      );
    }

    return id;
  }
}

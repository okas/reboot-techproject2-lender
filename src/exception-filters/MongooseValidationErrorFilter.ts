import { Catch, ErrorFilter } from "@tsed/platform-exceptions";
import { Context, ValidationError } from "@tsed/platform-params";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError)
export class MongooseValidationErrorFilter extends ErrorFilter {
  catch({ message, errors }: mongoose.Error.ValidationError, ctx: Context) {
    const platformValidationError = new ValidationError(
      message,
      Object.entries(errors).map(([prop, err]) => ({ [prop]: err }))
    );

    super.catch(platformValidationError, ctx);
  }
}

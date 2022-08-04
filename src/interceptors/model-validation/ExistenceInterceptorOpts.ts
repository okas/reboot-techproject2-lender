export type ExistenceInterceptorOpts = {
  /** Key on the parameter's object to obtain reference ID.*/
  key: string;

  /** Order of teh parameter to analyze, defaults to 0. */
  paramOrder?: number;

  /** Optional action name, used in error message. Defaults to decorated method's name. */
  action?: string;
};

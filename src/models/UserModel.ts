import { UserInfo } from "@tsed/passport";

export class User extends UserInfo {
  token: string;

  constructor({ id, email, password, token }: User) {
    super();

    this.id = id;
    this.email = email;
    this.password = password;
    this.token = token;
  }

  verifyPassword(password: string) {
    return this.password === password;
  }
}

import { argon2id, hash, verify } from "argon2";
import User from "../users/entities/user.entity";

export class AuthService {
  static hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
  };

  static hashPassword = async (plainPassword: string): Promise<string> =>
    await hash(plainPassword, this.hashingOptions);

  static verifyPassword = async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> =>
    await verify(hashedPassword, plainPassword, this.hashingOptions);

  static getSafeAttributes = (user: User): User => ({
    ...user,
    hashedPassword: undefined,
  });
}

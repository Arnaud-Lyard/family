import { IContext, JWTPayload } from "../interfaces/context.interface";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { envConfig } from "../../config/config";
import { User } from "../../users/entities/user.entity";
import { EntityRepository, MikroORM } from "@mikro-orm/postgresql";
import { AuthCheckerInterface, ResolverData } from "type-graphql";

export class CustomAuthChecker implements AuthCheckerInterface<IContext> {
  constructor(private readonly userRepository: EntityRepository<User>) {}

  async check(
    { root, args, context, info }: ResolverData<IContext>,
    roles: string[]
  ) {
    const { req } = context;

    const tokenInAuthHeaders = req.headers.authorization?.split(" ")[1];
    const tokenInCookie = cookie.parse(req.headers.cookie ?? "").token;

    const token = tokenInAuthHeaders ?? tokenInCookie;

    if (typeof token !== "string") return false;

    const decoded = jwt.verify(token, envConfig.JWT_PRIVATE_KEY) as JWTPayload;
    if (typeof decoded !== "object") return false;

    const id = decoded.userId;

    const currentUser = await context.em.findOne(User, { id });
    if (currentUser === null) return false;

    context.currentUser = currentUser;

    if (roles.length === 0) {
      return true;
    }

    return currentUser.roles.some((role) => roles.includes(role));
  }
}

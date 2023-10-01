import { User } from "../users/entities/user.entity";
import { IContext } from "../utils/interfaces/context.interface";
import { PlayerToMatch } from "./entities/playertomatch.entity";
import { EntityRepository, MikroORM } from "@mikro-orm/postgresql";

export class PlayerToMatchService {
  constructor(
    private readonly playerToMatchRepository: EntityRepository<PlayerToMatch>,
    private readonly userRepository: EntityRepository<User>,
    private readonly orm: MikroORM
  ) {}

  async checkIfNewMatch(ctx: IContext): Promise<boolean> {
    try {
      const user = await this.userRepository.findOneOrFail(ctx.currentUser!.id);
      const userToMatch = await this.playerToMatchRepository.find(
        user.player.id
      );
      if (userToMatch.length > 0) return true;
      else return false;
    } catch (error: any) {
      console.error("Error during new match check", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}

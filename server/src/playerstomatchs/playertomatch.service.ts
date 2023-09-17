import { ContextType } from "..";
import { UserRepository } from "../users/user.repository";
import { PlayerToMatch } from "./entities/playertomatch.entity";
import { PlayerToMatchRepository } from "./playertomatch.repository";

export class PlayerToMatchService {
  static async checkIfNewMatch(ctx: ContextType): Promise<boolean> {
    try {
      const user = await UserRepository.getUserById(ctx.currentUser!.id);
      const userToMatch = await PlayerToMatchRepository.checkIfNewMatch(
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

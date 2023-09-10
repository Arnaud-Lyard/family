import { Player } from "./entities/player.entity";
import { PlayerRepository } from "./player.repository";

export class PlayerService {
  static async getAllPlayers(): Promise<Player[]> {
    try {
      return await PlayerRepository.getAllPlayers();
    } catch (error) {
      console.error("Error during all player recuperation", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}

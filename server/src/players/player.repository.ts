import { Player } from "./entities/player.entity";
import DataSource from "../database";

export class PlayerRepository {
  static async create(): Promise<Player> {
    try {
      const player = DataSource.getRepository(Player).create();
      await DataSource.getRepository(Player).insert(player);
      return player;
    } catch (error) {
      console.error("Error during player creation query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  static async getAllPlayers(): Promise<Player[]> {
    try {
      const players = await DataSource.createQueryBuilder(Player, "player")
        .innerJoinAndSelect(
          "player.profile",
          "profile",
          "profile.isPlayer = :isPlayer",
          { isPlayer: true }
        )
        .getMany();
      return players;
    } catch (error) {
      console.error("Error during all player recuperation query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}

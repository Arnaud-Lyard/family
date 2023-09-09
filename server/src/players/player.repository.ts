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
}

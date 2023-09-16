import { Player } from "./entities/player.entity";
import { db } from "../database";

export class PlayerRepository {
  static async create(): Promise<Player> {
    try {
      const player = db.getRepository(Player).create();
      await db.getRepository(Player).insert(player);
      return player;
    } catch (error) {
      console.error("Error during player creation query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  static async getAllPlayers(): Promise<Player[]> {
    try {
      const players = await db
        .createQueryBuilder(Player, "player")
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

  static async reinitializePlayer(playerId: string): Promise<Player> {
    try {
      const player = await db
        .createQueryBuilder(Player, "player")
        .update(Player)
        .set({ rank: 1000, rating: 1000 })
        .where("id = :playerId", { playerId })
        .returning("*")
        .execute();
      return player.raw[0];
    } catch (error) {
      console.error("Error during player reinitialization query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  static async getPlayerById(playerId: string): Promise<Player> {
    try {
      const player = await db.getRepository(Player).findOne({
        where: { id: playerId },
      });
      if (player === null) throw new Error("PLAYER_NOT_FOUND");
      return player;
    } catch (error) {
      console.error("Error during player recuperation query", error);
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}

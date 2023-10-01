import { User } from "./users/entities/user.entity";
import { envConfig } from "./config/config";
import { Article } from "./articles/entities/article.entity";
import { Profile } from "./profiles/entities/profile.entity";
import { Player } from "./players/entities/player.entity";
import { Match } from "./matchs/entities/match.entity";
import { PlayerToMatch } from "./playerstomatchs/entities/playertomatch.entity";
import { MikroORM } from "@mikro-orm/postgresql";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Options } from "@mikro-orm/core";
export const ormConfig = {
  migrations: {
    path: "./src/migrations",
    tableName: "migrations",
    transactional: true,
  },
  user: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  dbName: envConfig.DB_NAME,
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  type: "postgresql",
  entities: [User, Article, Profile, Player, Match, PlayerToMatch],
  driver: PostgreSqlDriver,
} as Options<PostgreSqlDriver>;

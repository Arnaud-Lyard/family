import { User } from "./users/entities/user.entity";
import { envConfig } from "./config/config";
import { Article } from "./articles/entities/article.entity";
import { Profile } from "./profiles/entities/profile.entity";
import { Player } from "./players/entities/player.entity";
import { Match } from "./matchs/entities/match.entity";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Options } from "@mikro-orm/core";
const ormConfig = {
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    tableName: "migrations",
    transactional: true,
  },
  user: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  dbName: envConfig.DB_NAME,
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  type: "postgresql",
  entities: [User, Article, Profile, Player, Match],
  driver: PostgreSqlDriver,
} as Options<PostgreSqlDriver>;

export default ormConfig;

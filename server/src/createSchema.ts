import { User } from "./users/entities/user.entity";
import { envConfig } from "./config/config";
import { Article } from "./articles/entities/article.entity";
import { Profile } from "./profiles/entities/profile.entity";
import { Player } from "./players/entities/player.entity";
import { Match } from "./matchs/entities/match.entity";
import { PlayerToMatch } from "./playerstomatchs/entities/playertomatch.entity";
import { MikroORM } from "@mikro-orm/postgresql";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

(async () => {
  const orm = await MikroORM.init({
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
  });
  const generator = orm.getSchemaGenerator();
  // const dropDump = await generator.getDropSchemaSQL();
  // console.log(dropDump);

  const createDump = await generator.getCreateSchemaSQL();
  console.log(createDump);

  // const updateDump = await generator.getUpdateSchemaSQL();
  // console.log(updateDump);
})();

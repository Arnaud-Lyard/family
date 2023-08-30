import { DataSource } from "typeorm";
import User from "./users/entities/user.entity";
import config from "./config/config";
import { Article } from "./articles/entities/article.entity";

export default new DataSource({
  type: "postgres",
  host: config.DB_HOST || "database",
  port: config.DB_PORT || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  entities: [User, Article],
  logging: ["error"],
});

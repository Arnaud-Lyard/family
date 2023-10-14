// import "reflect-metadata";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./users/user.resolver";
import { User } from "./users/entities/user.entity";
import { envConfig } from "./config/config";
import cookie from "cookie";
import ormConfig from "./database";
import { ArticleResolver } from "./articles/article.resolver";
import { ProfileResolver } from "./profiles/profile.resolver";
import { PlayerResolver } from "./players/player.resolver";
import { MatchResolver } from "./matchs/match.resolver";
import { PlayerToMatchResolver } from "./playerstomatchs/playertomatch.resolver";
import { WebSocketServer } from "ws";
import { Extra, useServer } from "graphql-ws/lib/use/ws";
import { Context, SubscribeMessage } from "graphql-ws";
import { ExecutionArgs, GraphQLSchema } from "graphql";
import { RequestContext } from "@mikro-orm/core";
import { Server } from "http";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { EntityRepository, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { IContext } from "./utils/interfaces/context.interface";
import { ISubscriptionContext } from "./utils/interfaces/context.interface";
import { expressMiddleware } from "@apollo/server/express4";
import { UserService } from "./users/user.service";
import { CustomAuthChecker } from "./utils/auth/customAuthChecker";
import { IUserService } from "./users/user.service";
import { ArticleService } from "./articles/article.service";
import { PlayerService } from "./players/player.service";
import { EntityManager } from "@mikro-orm/postgresql";
import { ProfileService } from "./profiles/profile.service";
import { MatchService } from "./matchs/match.service";
export class Application {
  private readonly userRepository: EntityRepository<User>;
  public orm: MikroORM<IDatabaseDriver<Connection>>;
  public host: express.Application;
  public server: ApolloServer<IContext>;

  public connect = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init<PostgreSqlDriver>(ormConfig);

      const migrator = this.orm.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (migrations && migrations.length > 0) {
        await migrator.up();
      }
    } catch (error: any) {
      console.error("📌 Could not connect to the database", error);
      throw Error(error);
    }
  };

  public start = async (): Promise<void> => {
    this.host = express();

    try {
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [
          UserResolver,
          ArticleResolver,
          ProfileResolver,
          PlayerResolver,
          MatchResolver,
          PlayerToMatchResolver,
        ],
        validate: true,
        authChecker: CustomAuthChecker,
      });

      const httpServer = http.createServer(this.host);

      const server = new ApolloServer<IContext>({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose();
                },
              };
            },
          },
        ],
        introspection: envConfig.NODE_ENV !== "production",
      });

      await server.start();

      this.host.use(
        ["/", "/graphql"],
        cors<cors.CorsRequest>({
          origin: envConfig.CORS_ALLOWED_ORIGINS.split(","),
          credentials: true,
        }),
        express.json(),
        expressMiddleware(server, {
          context: async ({ req, res }) => ({
            req,
            res,
            services: {
              userService: new UserService(),
              articleService: new ArticleService(),
              playerService: new PlayerService(),
              profileService: new ProfileService(),
              matchService: new MatchService(),
            },
            em: this.orm.em.fork(),
          }),
        })
      );

      const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/subscriptions",
      });

      const serverCleanup = useServer(
        {
          schema,
          onConnect: async (ctx) => {
            if (tokenIsNotValid(ctx.connectionParams)) {
              throw new Error("Auth token missing!");
            }
          },
          onDisconnect(ctx, code, reason) {
            console.log("Disconnected!");
          },
          context: async (ctx, msg, args) => {
            return getDynamicContext(ctx, msg, args);
          },
        },
        wsServer
      );

      const getDynamicContext = async (
        ctx: Context<
          Record<string, unknown> | undefined,
          Extra & Partial<Record<PropertyKey, never>>
        >,
        msg: SubscribeMessage,
        args: ExecutionArgs
      ) => {
        if (ctx.connectionParams?.Authorization) {
          const bearerToken = ctx.connectionParams?.Authorization as string;
          const tokenInAuthHeaders = bearerToken.split(" ")[1];
          const token = tokenInAuthHeaders;

          const decoded = jwt.verify(token, envConfig.JWT_PRIVATE_KEY);
          if (typeof decoded !== "object") return false;
          const id = decoded.userId;

          const currentUser = await this.userRepository.findOne({ id });
          if (currentUser === null) return false;
          return { currentUser };
        }
      };

      function tokenIsNotValid(
        params: Readonly<Record<string, unknown> | undefined>
      ): boolean {
        if (params?.Authorization === undefined) return true;
        const bearerToken = params.Authorization as string;

        const tokenInAuthHeaders = bearerToken.split(" ")[1];

        const token = tokenInAuthHeaders;
        if (typeof token !== "string") return true;

        const decoded = jwt.verify(token, envConfig.JWT_PRIVATE_KEY);

        if (typeof decoded !== "object") return true;

        return false;
      }

      this.host.use(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          RequestContext.create(this.orm.em, next);
        }
      );

      // this.host.use(
      //   (
      //     error: Error,
      //     req: express.Request,
      //     res: express.Response,
      //     next: express.NextFunction
      //   ): void => {
      //     console.error("📌 Something went wrong", error);
      //     res.status(400).send(error);
      //   }
      // );

      const port = envConfig.SERVER_PORT ?? 4000;
      httpServer.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}`)
      );
    } catch (error: any) {
      console.error("📌 Could not start server", error);
    }
  };
}

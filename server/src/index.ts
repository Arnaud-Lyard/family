import "reflect-metadata";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./users/user.resolver";
import User from "./users/entities/user.entity";
import config from "./config/config";
import cookie from "cookie";
import { db } from "./database";
import { ArticleResolver } from "./articles/article.resolver";
import { ProfileResolver } from "./profiles/profile.resolver";
import { PlayerResolver } from "./players/player.resolver";
import { MatchResolver } from "./matchs/match.resolver";
import { PlayerToMatchResolver } from "./playerstomatchs/playertomatch.resolver";
import { WebSocketServer } from "ws";
import { Extra, useServer } from "graphql-ws/lib/use/ws";
import { Context, SubscribeMessage } from "graphql-ws";
import { ExecutionArgs } from "graphql";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
  jwtPayload?: jwt.JwtPayload;
}

export interface SubScriptionContextType {
  currentUser: User;
}

async function start(): Promise<void> {
  await db.initialize();
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ArticleResolver,
      ProfileResolver,
      PlayerResolver,
      MatchResolver,
      PlayerToMatchResolver,
    ],
    validate: false,
    authChecker: async ({ context }: { context: ContextType }, roles = []) => {
      const { req } = context;
      const tokenInAuthHeaders = req.headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(req.headers.cookie ?? "").token;
      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token !== "string") return false;

      const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);
      if (typeof decoded !== "object") return false;

      const id = decoded.userId;
      const currentUser = await db.getRepository(User).findOneBy({ id });
      if (currentUser === null) return false;

      context.currentUser = currentUser;
      return roles.length === 0 || roles.includes(currentUser.role);
    },
  });

  const server = new ApolloServer<ContextType>({
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
  });

  await server.start();

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

      const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);
      if (typeof decoded !== "object") return false;
      const id = decoded.userId;

      const currentUser = await db.getRepository(User).findOneBy({ id });
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

    const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);

    if (typeof decoded !== "object") return true;

    return false;
  }
  app.use(
    ["/", "/graphql"],
    cors<cors.CorsRequest>({
      origin: config.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  const port = config.SERVER_PORT ?? 4000;
  httpServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
}

start().catch(console.error);

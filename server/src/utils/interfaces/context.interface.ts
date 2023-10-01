import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { User } from "../../users/entities/user.entity";
import { UserService } from "../../users/user.service";
import { ArticleService } from "../../articles/article.service";
import { PlayerService } from "../../players/player.service";
import { ProfileService } from "../../profiles/profile.service";
import { MatchService } from "../../matchs/match.service";

export interface IContext {
  req: Request;
  res: Response;
  em: EntityManager<IDatabaseDriver<Connection>>;
  services: {
    userService: UserService;
    articleService: ArticleService;
    playerService: PlayerService;
    profileService: ProfileService;
    matchService: MatchService;
  };
  currentUser?: User;
}

export interface ISubscriptionContext {
  currentUser: User;
}

export interface JWTPayload {
  userId: string;
}

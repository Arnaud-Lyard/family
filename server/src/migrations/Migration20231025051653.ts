import { Migration } from "@mikro-orm/migrations";

export class Migration20231025051653 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    this.addSql(
      'create table "match" ("id" uuid not null default uuid_generate_v4(), "status" text check ("status" in (\'pending\', \'progress\', \'done\')) not null default \'pending\', "planned_date" timestamptz(0) not null, "created_at" timestamptz(0) not null, constraint "match_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "player" ("id" uuid not null default uuid_generate_v4(), "rank" int not null default 1000, "rating" int not null default 1000, "victory" int not null default 0, "defeat" int not null default 0, constraint "player_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "match_players" ("match_id" uuid not null, "player_id" uuid not null, constraint "match_players_pkey" primary key ("match_id", "player_id"));'
    );

    this.addSql(
      'create table "user" ("id" uuid not null default uuid_generate_v4(), "username" varchar(255) not null, "email" varchar(255) not null, "hashed_password" varchar(255) not null, "roles" text[] not null default \'{visitor}\', "player_id" uuid not null, constraint "user_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");'
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");'
    );
    this.addSql(
      'alter table "user" add constraint "user_player_id_unique" unique ("player_id");'
    );
    this.addSql(
      'alter table "user" add constraint "user_username_email_unique" unique ("username", "email");'
    );

    this.addSql(
      'create table "profile" ("id" uuid not null default uuid_generate_v4(), "is_player" boolean not null default true, "battletag" varchar(255) not null default \'\', "user_id" uuid not null, "player_id" uuid not null, constraint "profile_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "profile" add constraint "profile_user_id_unique" unique ("user_id");'
    );
    this.addSql(
      'alter table "profile" add constraint "profile_player_id_unique" unique ("player_id");'
    );

    this.addSql(
      'create table "article" ("id" uuid not null default uuid_generate_v4(), "title" varchar(255) not null, "content" varchar(255) not null, "user_id" uuid not null, constraint "article_pkey" primary key ("id"));'
    );

    this.addSql(
      'alter table "match_players" add constraint "match_players_match_id_foreign" foreign key ("match_id") references "match" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "match_players" add constraint "match_players_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "user" add constraint "user_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "profile" add constraint "profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "profile" add constraint "profile_player_id_foreign" foreign key ("player_id") references "player" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "article" add constraint "article_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    );
  }
}

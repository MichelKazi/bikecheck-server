import "reflect-metadata";
import { DataSource } from "typeorm";
import { Bike, Component, Profile } from "../models";
import Env from "./env";

const dbUrl = `${Env.DATABASE_URL}${Env.NODE_ENV === "TEST" ? "_test" : ""}`;

const AppDataSource = new DataSource({
  type: "postgres",
  url: dbUrl,
  entities: [Profile, Bike, Component],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log(
      `Data source ${Env.DATABASE_NAME} initialized on port ${Env.DATABASE_PORT}`,
    );
  })
  .catch((error) => console.log(error));

export { AppDataSource as db };

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Profile } from "../models";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = `${process.env.DATABASE_URL}${process.env.ENV === "TEST" ? "_test" : ""}`;

const AppDataSource = new DataSource({
  type: "postgres",
  url: dbUrl,
  entities: [Profile],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log(
      `Data source ${process.env.DB_NAME} initialized on port ${process.env.DB_PORT}`,
    );
  })
  .catch((error) => console.log(error));

export { AppDataSource as db };

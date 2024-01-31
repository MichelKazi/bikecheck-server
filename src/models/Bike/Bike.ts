import { BikeType } from "../enums";
import { Component } from "../Component/Component";
import { Knex } from "knex";

interface Bike {
  id: string;
  profileId: string;
  make: string;
  model: string;
  year: number;
  type: BikeType;
  Components: Component[];
}

const createBikeTable = (knex: Knex) => {
  knex.schema
    .createTable("profile", (table) => {
      table.uuid("id", { primaryKey: true });

      table.string("username");
      table.string("email");
      table.string("passwordHash");
    })
    .createTable("bike", (table) => {
      table.uuid("id", { primaryKey: true });

      table
        .uuid("profile_id")
        .references("id")
        .inTable("profile")
        .onDelete("CASCADE");

      table.string("make");
      table.string("model");
      table.string("type");
      table.integer("year");
    })
    .createTable("component", (table) => {
      table.uuid("id", { primaryKey: true });

      table
        .uuid("bike_id")
        .references("id")
        .inTable("bike")
        .onDelete("CASCADE");

      table.string("type");
      table.float("status");
      table.date("lastServiced");
      table.string("brand");
      table.string("model");
      table.integer("mileage").unsigned();
      table.integer("battery").unsigned();
    });
};

export { Bike, createBikeTable };

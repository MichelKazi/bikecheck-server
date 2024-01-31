import { Knex } from "knex";
import { ComponentType } from "../enums";

interface Component {
  id: string;
  bikeId: string;
  type: ComponentType;
  status: number; // Status as a number from 1 to 10
  lastServiced: Date;
  Brand: string;
  model: string;
  mileage: number;
  battery: number;
}

const createComponentTable = (knex: Knex) => {
  knex.schema.createTable("component", (table) => {
    table.uuid("id", { primaryKey: true });

    table.uuid("bike_id").references("id").inTable("bike").onDelete("CASCADE");

    table.string("type");
    table.float("status");
    table.date("last_serviced");
    table.string("brand");
    table.string("model");
    table.integer("mileage").unsigned();
    table.integer("battery").unsigned();
    table.timestamps(true, true, true);
  });
};

export { Component, createComponentTable };

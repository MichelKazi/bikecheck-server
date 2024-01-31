import { BikeType } from "../enums";
import { Component } from "../Component/Component";

export interface Bike {
  id: string;
  make: string;
  model: string;
  year: number;
  type: BikeType;
  Components: Component[];
}
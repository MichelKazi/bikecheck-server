import { ComponentType } from "../enums";

export interface Component {
  type: ComponentType;
  status: number; // Status as a number from 1 to 10
  lastServiced: Date;
  Brand: string;
  model: string;
  mileage: number;
  battery: number;
}

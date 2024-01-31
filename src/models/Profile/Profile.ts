import { Bike } from "../Bike/Bike";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  bikes: Bike[];
}
